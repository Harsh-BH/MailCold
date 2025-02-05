from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import Optional
import PyPDF2

from app.services.search_service import scrape_page, google_search
from app.services.langchain_service import generate_cold_email, summarize_text
from app.services.langchain_service import generate_contextual_suggestions , generate_email_subject_lines

router = APIRouter()


def extract_pdf_text(pdf_file: UploadFile) -> str:
    pdf_reader = PyPDF2.PdfReader(pdf_file.file)
    all_text = []
    for page in pdf_reader.pages:
        text = page.extract_text()
        if text:
            all_text.append(text)
    return "\n".join(all_text)




@router.post("/generate_email")
async def generate_email_endpoint(
    prospect_name: str = Form(..., description="Example: 'John Doe AI Researcher'"),
    extra_link: Optional[str] = Form(None, description="Example: 'https://www.linkedin.com/in/johndoe/'"),
    cv: UploadFile = File(..., description="Upload your CV as a PDF"),
    # selected_template_key: str = Form(..., description="Email template key, e.g. 'research_inquiry'")
):

    search_results = google_search(prospect_name)

    page_text = ""
    if extra_link:
        page_text = scrape_page(extra_link)

    try:
        cv_text = extract_pdf_text(cv)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading PDF: {str(e)}")

    search_snippets = []
    for item in search_results[:2]:
        snippet = item.get("snippet", "")
        search_snippets.append(snippet)

    prospect_content = page_text + "\n" + "\n".join(search_snippets)

    prospect_summary = summarize_text(prospect_content)

    cv_summary = summarize_text(cv_text)


    final_email = generate_cold_email(
        prospect_info=prospect_summary,
        cv_info=cv_summary,
        prospect_name=prospect_name,
        # selected_template_key=selected_template_key
    )

    suggestions = generate_contextual_suggestions(cv_info=cv_summary, prospect_info=prospect_summary)

    subject_lines = generate_email_subject_lines(cv_info=cv_summary, prospect_info=prospect_summary)

    return {
        "email": final_email,
        "contextual_suggestions": suggestions,
        "subject_lines": subject_lines
    }
