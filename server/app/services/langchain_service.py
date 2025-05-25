import os
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from typing import List
from email_templates.templates import email_templates, get_subject_line_prompt, get_contextual_suggestions_prompt
from transformers import pipeline


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

    result = chain.run(
        text = text
    )

    # summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

    # summary = summarizer(text, max_length=130, min_length=30, do_sample=False)
    return result.strip()


def summarize_project_of_professor(text: str, max_chars: int = 2000) -> str:

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

    result = chain.run(
        text = text
    )

    # summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

    # summary = summarizer(text, max_length=130, min_length=30, do_sample=False)
    return result.strip()


def generate_cold_email(
    prospect_info: str,
    cv_info: str,
    prospect_name: str,
    project_info: str,
    email_type: str = "research_inquiry"
) -> str:
    if not OPENAI_API_KEY:
        return "OPENAI_API_KEY not set. Can't generate email."

    # Get the appropriate template for the email type
    email_template = email_templates.get(email_type, email_templates["research_inquiry"])
    prompt_text = email_template["prompt"]

    llm = ChatOpenAI(
        openai_api_key=OPENAI_API_KEY,
        temperature=0.4,  # Slightly reduced temperature for more consistent output
        model_name="gpt-3.5-turbo"
    )

    prompt_template = PromptTemplate.from_template(prompt_text)

    chain = LLMChain(llm=llm, prompt=prompt_template)
    
    result = chain.run(
        prospect_info=prospect_info,
        cv_info=cv_info,
        prospect_name=prospect_name,
        project_info=project_info
    )
    
    return result.strip()


def generate_contextual_suggestions(cv_info: str, prospect_info: str, email_type: str = "research_inquiry") -> str:
    if not OPENAI_API_KEY:
        return "OPENAI_API_KEY not set. Can't generate suggestions."

    prompt_text = get_contextual_suggestions_prompt(email_type)

    llm = ChatOpenAI(
        openai_api_key=OPENAI_API_KEY,
        temperature=0.3,
        model_name="gpt-3.5-turbo"
    )

    prompt_template = PromptTemplate.from_template(prompt_text)

    chain = LLMChain(llm=llm, prompt=prompt_template)
    
    result = chain.run(
        cv_info=cv_info,
        prospect_info=prospect_info
    )

    return result.strip()


def generate_email_subject_lines(cv_info: str, prospect_info: str, email_type: str = "research_inquiry") -> str:
    if not OPENAI_API_KEY:
        return "OPENAI_API_KEY not set. Can't generate suggestions."

    prompt_text = get_subject_line_prompt(email_type)

    llm = ChatOpenAI(
        openai_api_key=OPENAI_API_KEY,
        temperature=0.4,
        model_name="gpt-3.5-turbo"
    )

    prompt_template = PromptTemplate.from_template(prompt_text)

    chain = LLMChain(llm=llm, prompt=prompt_template)
    
    result = chain.run(
        cv_info=cv_info,
        prospect_info=prospect_info
    )

    subject_lines = [line.strip() for line in result.split("\n") if line.strip()]
    formatted_output = "\nGenerated Email Subject Lines:\n\n"
    formatted_output += "\n".join(subject_lines)

    return formatted_output




