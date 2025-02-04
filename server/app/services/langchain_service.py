import os
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from typing import List
from email_templates.templates import email_templates

from app.config import GOOGLE_API_KEY, OPENAI_API_KEY


def summarize_text(text: str, max_chars: int = 2000) -> str:

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
    prospect_name: str,
    selected_template_key:str
) -> str:
    if not OPENAI_API_KEY:
        return "OPENAI_API_KEY not set. Can't generate email."

    selected_template_data = email_templates.get(selected_template_key)
    if not selected_template_data:
        return "Invalid template selected."
    selected_template = selected_template_data["template"]

    llm = ChatOpenAI(
        openai_api_key=OPENAI_API_KEY,
        temperature=0.3,
        model_name="gpt-3.5-turbo"
    )

    prompt_template = PromptTemplate.from_template(
        """You are an expert at writing personalized, formal, and professional cold outreach emails addressed to senior professionals.

        Below is the base email template to follow:
        {selected_template}

        Prospect Information (scraped and summarized): {prospect_info}

        My Background and Projects (from my CV): {cv_info}

        Prospect Name: {prospect_name}

        Using the above, craft a formal cold email that adheres to the structure of the provided template. Ensure that any placeholders in the template (such as {professor_name}, {field_of_study}, {experience}, {your_name}, or {research_area}) are appropriately filled in or adjusted based on the provided details. The final email should be coherent, professional, and include a clear call to action.

        """
    )

    chain = LLMChain(llm=llm, prompt=prompt_template)
    result = chain.run(
        prospect_info=prospect_info,
        cv_info=cv_info,
        prospect_name=prospect_name,
        selected_template = selected_template
    )
    return result.strip()


def generate_contextual_suggestions(cv_info:str, prospect_info:str)->str:

    if not OPENAI_API_KEY:
        return "OPENAI_API_KEY not set. Can't generate suggestions."

    llm  = ChatOpenAI(openai_api_key = OPENAI_API_KEY,
                      temperature = 0.3,
                      model_name = "gpt-3.5-turbo"
                      )

    prompt_template = PromptTemplate.from_template(
                """Analyze the following CV information and prospect information.
        Identify and suggest areas of overlap between the candidate's expertise and the professor's research interests.

        CV Information: {cv_info}

        Prospect Information: {prospect_info}

        Provide your suggestions in a concise manner."""
    )

    chain = LLMChain(llm = llm , prompt = prompt_template)
    result = chain.run(cv_info = cv_info,
                       prospect_info = prospect_info)

    return result.strip()


def generate_email_subject_lines(cv_info:str, prospect_info:str)->list[str]:

    if not OPENAI_API_KEY:
        return "OPENAI_API_KEY not set. Can't generate suggestions."


    llm  = ChatOpenAI(openai_api_key = OPENAI_API_KEY,
                      temperature = 0.3,
                      model_name = "gpt-3.5-turbo"
                      )

    prompt_template = PromptTemplate.from_template(
        """Using the following information, generate 3 compelling and professional email subject lines
that capture the candidate's expertise and the professor's research interests.

CV Information: {cv_info}
Prospect Information: {prospect_info}

Provide each subject line on a new line."""
    )

    chain = LLMChain(llm=llm, prompt=prompt_template)
    result = chain.run(cv_info=cv_info, prospect_info=prospect_info)
    subject_lines = [line.strip() for line in result.split("\n") if line.strip()]
    return subject_lines




