import os
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from typing import List
from email_templates.templates import email_templates
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
    project_info:str,
    # selected_template_key:str
) -> str:
    if not OPENAI_API_KEY:
        return "OPENAI_API_KEY not set. Can't generate email."

    # selected_template_data = email_templates.get(selected_template_key)
    # if not selected_template_data:
    #     return "Invalid template selected."
    # selected_template = selected_template_data["template"]

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

Prospect work :{project_info}

Using the above information, craft a formal cold email that references the prospect's background and accomplishments, and clearly connects my experience, projects, and skills (as detailed in my CV) with their work. In the email, respectfully suggest potential upgrades or enhancements to their projects and inquire whether my expertise might contribute to further improvements or innovations. Ensure the tone is formal, courteous, and professional, and conclude with a clear call to action for further conversation.
"""
    )



    chain = LLMChain(llm=llm, prompt=prompt_template)
    result = chain.run(
        prospect_info=prospect_info,
        cv_info=cv_info,
        prospect_name=prospect_name,
        project_info = project_info,
        # selected_template = selected_template
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




