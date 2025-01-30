from fastapi import APIRouter , HTTPException
from pydantic import BaseModel , Field
from typing import Optional

from app.services.search_service import scrape_page , google_search
from app.services.langchain_service import generate_cold_email , summarize_text

router =  APIRouter()

class GenerateRequest(BaseModel):
    prospect_name: str = Field(..., example="John Doe AI Researcher")
    extra_link: Optional[str] = Field(None, example="https://www.linkedin.com/in/johndoe/")
    product_description: Optional[str] = Field("my awesome product", example="SaaS tool for NLP tasks")


@router.post("/generate_email")
async def generate_email_endpoint(body:GenerateRequest):


    search_query  = body.prospect_name
    search_results = google_search(search_query)

    page_text = ""
    if body.extra_link:
        page_text = scrape_page(body.extra_link)

    search_snippet = []

    for item in search_results[:2]:
        snippet = item.get("snippet","")
        link  = item.get("link","")

        search_snippet.append(snippet)

    combined_text = page_text + "\n".join(search_snippet)

    summary = summarize_text(combined_text)

    final_email = generate_cold_email(summary , body.product_description)

    return {
        "email": final_email
    }

