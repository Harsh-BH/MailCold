email_templates = {
    "research_inquiry": {
        "name": "Research Inquiry",
        "prompt": (
            "You are an expert at writing personalized, formal cold outreach emails for graduate students or researchers "
            "reaching out to professors about research opportunities. "
            "\n\nProspect Information: {prospect_info}"
            "\n\nMy Background (from CV): {cv_info}"
            "\n\nProfessor's Name: {prospect_name}"
            "\n\nProfessor's Project: {project_info}"
            "\n\nUsing the above information, craft a formal research inquiry email that:"
            "\n1. Opens with a personalized greeting using the professor's name and title"
            "\n2. Introduces yourself briefly with your current position and institution"
            "\n3. Shows knowledge of the professor's work by specifically referencing their projects or papers"
            "\n4. Explains why you're interested in their work with 1-2 specific connections to your background"
            "\n5. Clearly states your purpose (seeking research collaboration, PhD position, etc.)"
            "\n6. Mentions 1-2 ideas how your skills could contribute to their research"
            "\n7. Includes a polite request for a meeting or call to discuss further"
            "\n8. Ends with a professional closing"
            "\n\nEnsure the tone is respectful, enthusiastic but not overly familiar. Keep the email between 200-300 words."
        )
    },
    "internship_application": {
        "name": "Internship Application",
        "prompt": (
            "You are an expert at writing personalized, formal internship application emails for students "
            "applying to work with professors or research labs. "
            "\n\nProspect Information: {prospect_info}"
            "\n\nMy Background (from CV): {cv_info}"
            "\n\nProfessor's Name: {prospect_name}"
            "\n\nProfessor's Project: {project_info}"
            "\n\nUsing the above information, craft a formal internship application email that:"
            "\n1. Opens with a proper greeting addressing the professor by name and title"
            "\n2. Introduces yourself with your degree program, university, and year of study"
            "\n3. States clearly you are applying for an internship position in their lab/group"
            "\n4. Shows knowledge of their lab's work with specific mentions of recent projects"
            "\n5. Explains why you want to intern specifically with them (be genuine and specific)"
            "\n6. Highlights 2-3 relevant skills or experiences you have that align with their work"
            "\n7. Mentions your availability (start date, duration of internship)"
            "\n8. Politely asks about next steps or offers to provide additional information"
            "\n9. Includes a professional closing"
            "\n\nEnsure the tone is professional, enthusiastic and respectful. Keep the email concise (200-250 words)."
        )
    },
    "collaboration_proposal": {
        "name": "Collaboration Proposal",
        "prompt": (
            "You are an expert at writing personalized, professional collaboration proposal emails between researchers "
            "or between students and professors. "
            "\n\nProspect Information: {prospect_info}"
            "\n\nMy Background (from CV): {cv_info}"
            "\n\nProfessor's Name: {prospect_name}"
            "\n\nProfessor's Project: {project_info}"
            "\n\nUsing the above information, craft a formal collaboration proposal email that:"
            "\n1. Opens with a proper academic greeting"
            "\n2. Introduces yourself and your position/institution briefly"
            "\n3. Demonstrates familiarity with the professor's specific research works or papers (cite 1-2 examples)"
            "\n4. Clearly presents a specific collaboration idea that connects your work with theirs"
            "\n5. Outlines potential mutual benefits of collaboration (be specific)"
            "\n6. Explains what resources or skills you bring to the collaboration"
            "\n7. Proposes a concrete next step (meeting, call, further discussion)"
            "\n8. Closes professionally"
            "\n\nThe tone should be professional, collegial and specific. Avoid vague statements and focus on concrete "
            "collaboration possibilities. Keep the email between 250-350 words."
        )
    },
    "follow_up": {
        "name": "Follow-up Email",
        "prompt": (
            "You are an expert at writing effective, professional follow-up emails in academic contexts. "
            "\n\nProspect Information: {prospect_info}"
            "\n\nMy Background (from CV): {cv_info}"
            "\n\nProfessor's Name: {prospect_name}"
            "\n\nProfessor's Project: {project_info}"
            "\n\nUsing the above information, craft a follow-up email that:"
            "\n1. Opens with a greeting that references your previous interaction"
            "\n2. Reminds the professor who you are and what you previously discussed/applied for"
            "\n3. Expresses continued interest in the opportunity"
            "\n4. Adds one new piece of relevant information (new achievement, additional thought on their research, etc.)"
            "\n5. Respectfully requests an update on your application/inquiry"
            "\n6. Offers to provide any additional information if needed"
            "\n7. Ends with a professional closing"
            "\n\nThe tone should be polite, professional and not demanding. Acknowledge the professor's busy schedule. "
            "Keep the email brief (150-200 words)."
        )
    }
}

def get_subject_line_prompt(email_type):
    base_prompt = (
        "Generate 5 compelling professional email subject lines for a {type_description}. "
        "The subject lines should be attention-grabbing yet professional, specific to the context, "
        "and increase the likelihood of the email being opened and read."
        "\n\nCV Information: {cv_info}"
        "\n\nProspect Information: {prospect_info}"
        "\n\nEnsure the subject lines are:"
        "\n- Brief (5-9 words)"
        "\n- Specific rather than generic"
        "\n- Professional in tone"
        "\n- Relevant to the recipient's work"
        "\n- Free of clickbait tactics"
        "\n\nProvide each subject line on a new line."
    )
    
    type_descriptions = {
        "research_inquiry": "research position inquiry to a professor",
        "internship_application": "internship application to a professor's lab",
        "collaboration_proposal": "research collaboration proposal to a professor",
        "follow_up": "follow-up email to a professor regarding a previous application or inquiry"
    }
    
    return base_prompt.format(
        type_description=type_descriptions.get(email_type, "cold email to a professor"),
        cv_info="{cv_info}",
        prospect_info="{prospect_info}"
    )


def get_contextual_suggestions_prompt(email_type):
    base_prompt = (
        "Analyze the following CV information and professor information. "
        "Based on the context of a {type_description}, provide strategic suggestions to make the outreach more effective."
        "\n\nCV Information: {cv_info}"
        "\n\nProspect Information: {prospect_info}"
        "\n\nProvide 3-5 specific, actionable suggestions that:"
        "\n1. Identify the strongest connections between the candidate's background and the professor's work"
        "\n2. Highlight specific skills or experiences that would be most impressive to mention"
        "\n3. Suggest specific papers or projects of the professor to reference"
        "\n4. Recommend specific approaches or tones to use given the context"
        "\n5. Provide any warnings about potential pitfalls to avoid"
        "\n\nFormat each suggestion as a concise, actionable point with a brief explanation."
    )
    
    type_contexts = {
        "research_inquiry": "research position inquiry",
        "internship_application": "internship application",
        "collaboration_proposal": "research collaboration proposal",
        "follow_up": "follow-up email regarding a previous application or inquiry"
    }
    
    return base_prompt.format(
        type_description=type_contexts.get(email_type, "cold email to a professor"),
        cv_info="{cv_info}",
        prospect_info="{prospect_info}"
    )