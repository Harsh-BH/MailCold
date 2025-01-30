import os
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from typing import List

from app.config import GOOGLE_API_KEY,OPENAI_API_KEY


def summarize_text(text:str , max_chars:int = 2000)->str:

    if not OPENAI_API_KEY:
        return text


    truncated_text = text[:max_chars]

    llm  = OpenAI(openai_api_key=OPENAI_API_KEY,temperature=0.3)

    prompt_template = PromptTemplate.from_template(
    "Please provide a concise summary of the following text:\n\n{text}"
    )

    chains = LLMChain(llm = llm ,prompt=prompt_template)
    summary = chains.run(text=truncated_text)

    return summary.strip()


def generate_cold_email(prospect_info: str, user_product: str = "my product") -> str:

    if not OPENAI_API_KEY:
        return f"OPENAI_API_KEY not set. Can't generate email."

    llm = OpenAI(openai_api_key=OPENAI_API_KEY, temperature=0.3 )
    prompt_tempalte  = PromptTemplate("""You are an expert at writing personalized cold outreach emails.

Prospect information (summarized): {prospect_info}

Your product or service: {user_product}

Write a concise, friendly, personalized cold email referencing the prospect's background and
introducing the product. Include a clear call to action to continue the conversation.
""")

    chain=  LLMChain(llm = llm , prompt=prompt_tempalte)
    result  = chain.run(prospect_info = prospect_info , user_product= user_product)

    return result.strip()



