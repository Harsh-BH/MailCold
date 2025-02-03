import os
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from typing import List

from app.config import GOOGLE_API_KEY, OPENAI_API_KEY


def summarize_text(text: str, max_chars: int = 2000) -> str:
    """
    Summarizes the provided text using a language model.
    If no OPENAI_API_KEY is set, returns the original text.
    """
    if not OPENAI_API_KEY:
        return text

    truncated_text = text[:max_chars]
    llm = ChatOpenAI(
        openai_api_key=OPENAI_API_KEY,
        temperature=0.3,
        model_name="gpt-3.5-turbo"
    )

    prompt_template = PromptTemplate.from_template(
        "Please provide a concise summary of the following text:\n\n{text}"
    )

    chain = LLMChain(llm=llm, prompt=prompt_template)
    summary = chain.run(text=truncated_text)
    return summary.strip()


def generate_cold_email(
    prospect_info: str,
    cv_info: str,
    prospect_name: str
) -> str:
    """
    Generates a personalized cold email using separate summaries for the prospect's
    information and my own background/projects as highlighted in my CV.
    """
    if not OPENAI_API_KEY:
        return "OPENAI_API_KEY not set. Can't generate email."

    llm = ChatOpenAI(
        openai_api_key=OPENAI_API_KEY,
        temperature=0.3,
        model_name="gpt-3.5-turbo"
    )

    prompt_template = PromptTemplate.from_template(
        """You are an expert at writing personalized, formal, and professional cold outreach emails addressed to senior professionals.

Prospect Information (scraped and summarized): {prospect_info}

My Background and Projects (from my CV): {cv_info}

Prospect Name: {prospect_name}

Using the above information, craft a formal cold email that references the prospect's background and accomplishments, and clearly connects my experience, projects, and skills (as detailed in my CV) with their work. In the email, respectfully suggest potential upgrades or enhancements to their projects and inquire whether my expertise might contribute to further improvements or innovations. Ensure the tone is formal, courteous, and professional, and conclude with a clear call to action for further conversation.
"""
    )

    chain = LLMChain(llm=llm, prompt=prompt_template)
    result = chain.run(
        prospect_info=prospect_info,
        cv_info=cv_info,
        prospect_name=prospect_name,
    )
    return result.strip()
