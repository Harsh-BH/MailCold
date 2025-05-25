from fastapi import APIRouter, HTTPException, UploadFile, File, Form, Request
from typing import Optional
import PyPDF2
import traceback

from app.services.search_service import scrape_page, google_search, get_university_faculty
from app.services.langchain_service import generate_cold_email, summarize_text, summarize_project_of_professor
from app.services.langchain_service import generate_contextual_suggestions, generate_email_subject_lines

router = APIRouter()


def extract_pdf_text(pdf_file: UploadFile) -> str:
    pdf_reader = PyPDF2.PdfReader(pdf_file.file)
    all_text = []
    for page in pdf_reader.pages:
        text = page.extract_text()
        if text:
            all_text.append(text)
    # Reset file pointer for potential reuse
    pdf_file.file.seek(0)
    return "\n".join(all_text)


@router.post("/debug_request")
async def debug_request(request: Request):
    """Endpoint to debug incoming requests"""
    form = await request.form()
    
    result = {
        "form_keys": list(form.keys()),
        "files": [],
        "values": {}
    }
    
    # Extract file details
    for key in form.keys():
        item = form[key]
        if isinstance(item, UploadFile):
            result["files"].append({
                "field_name": key,
                "filename": item.filename,
                "content_type": item.content_type,
                "size": "unknown"  # Can't easily get size without reading
            })
        else:
            result["values"][key] = str(item)
    
    return result


@router.post("/generate_email")
async def generate_email_endpoint(
    request: Request,
    prospect_name: str = Form(..., description="Example: 'John Doe AI Researcher'"),
    extra_link: Optional[str] = Form(None, description="Example: 'https://www.linkedin.com/in/johndoe/'"),
    cv: UploadFile = File(..., description="Upload your CV as a PDF"),
    project_info: str = Form(..., description="Example:'fluid dynamics'"),
    email_type: str = Form("research_inquiry", description="Type of email to generate")
):
    # Print detailed debugging
    print(f"Received request with parameters:")
    print(f"- prospect_name: {prospect_name}")
    print(f"- extra_link: {extra_link}")
    print(f"- project_info: {project_info}")
    print(f"- email_type: {email_type}")
    print(f"- cv: {cv.filename}, content_type: {cv.content_type}")

    # Validate email_type
    valid_email_types = ["research_inquiry", "internship_application", "collaboration_proposal", "follow_up"]
    if email_type not in valid_email_types:
        email_type = "research_inquiry"  # Default to research inquiry if invalid
    
    try:
        # Log request info for debugging
        client_host = request.client.host if request.client else "unknown"
        print(f"Request received from {client_host} for {prospect_name} with email type {email_type}")
        
        search_results = google_search(prospect_name)

        page_text = ""
        if extra_link:
            page_text = scrape_page(extra_link)

        try:
            cv_text = extract_pdf_text(cv)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error reading PDF: {str(e)}")

        try:
            project_info_summary = summarize_project_of_professor(project_info)
        except Exception as e:
            # Fall back to original if summarization fails
            project_info_summary = project_info
            print(f"Error summarizing project info, using original: {str(e)}")

        search_snippets = []
        for item in search_results[:3]:  # Increased to 3 for better context
            snippet = item.get("snippet", "")
            search_snippets.append(snippet)

        # Try to get more detailed info from the top search result
        if search_results and len(search_results) > 0:
            try:
                top_link = search_results[0].get("link", "")
                if top_link:
                    top_page_text = scrape_page(top_link)
                    page_text += "\n\n" + top_page_text
            except Exception as e:
                # Just log the error but continue
                print(f"Error scraping top result: {str(e)}")

        prospect_content = page_text + "\n" + "\n".join(search_snippets)

        prospect_summary = summarize_text(prospect_content)
        cv_summary = summarize_text(cv_text)

        print(f"Generating email with type: {email_type}")
        
        final_email = generate_cold_email(
            prospect_info=prospect_summary,
            cv_info=cv_summary,
            prospect_name=prospect_name,
            project_info=project_info_summary,
            email_type=email_type
        )

        suggestions = generate_contextual_suggestions(
            cv_info=cv_summary, 
            prospect_info=prospect_summary,
            email_type=email_type
        )

        subject_lines = generate_email_subject_lines(
            cv_info=cv_summary, 
            prospect_info=prospect_summary,
            email_type=email_type
        )

        return {
            "email": final_email,
            "contextual_suggestions": suggestions,
            "subject_lines": subject_lines,
            "email_type": email_type
        }
        
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"An error occurred during email generation: {str(e)}")



