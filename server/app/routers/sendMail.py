from fastapi import APIRouter, HTTPException, Form
from app.email_provider_integration import get_gmail_service, send_email

router = APIRouter()

@router.post("/sendEmail")
async def send_mail(
    recipient_email: str = Form(..., description="The recipient's email address"),
    final_email: str = Form(..., description="The final email content to be sent"),
    subject: str = Form(..., description="Subject of the email")
):
    sender_email = "your_email@gmail.com"

    try:
        service = get_gmail_service()
        result = send_email(service, sender_email, recipient_email, subject, final_email)
        if result:
            return {"message": "Email sent successfully", "id": result.get("id")}
        else:
            raise HTTPException(status_code=500, detail="Failed to send email")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
