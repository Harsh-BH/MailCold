import os
import pickle
import base64
from email.mime.text import MIMEText

from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

SCOPES = ['https://www.googleapis.com/auth/gmail.send']

def get_gmail_service():
    """
    Authenticates the user via OAuth2 and returns an authorized Gmail service.
    This service uses the Gmail API endpoint: https://gmail.googleapis.com/gmail/v1
    """
    creds = None
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
   
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run.
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)
    service = build('gmail', 'v1', credentials=creds)
    return service

def create_message(sender: str, to: str, subject: str, message_text: str) -> dict:
    """
    Creates a MIME email message and encodes it for the Gmail API.
    """
    message = MIMEText(message_text)
    message['to'] = to
    message['from'] = sender
    message['subject'] = subject
    raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
    return {'raw': raw_message}

def send_email(service, sender: str, to: str, subject: str, message_text: str):
    """
    Sends an email message using the Gmail API.
    This calls the REST endpoint: POST https://gmail.googleapis.com/gmail/v1/users/me/messages/send
    """
    message = create_message(sender, to, subject, message_text)
    try:
        sent_message = service.users().messages().send(userId="me", body=message).execute()
        print(f"Message Id: {sent_message['id']}")
        return sent_message
    except Exception as e:
        print(f"An error occurred: {e}")
        return None
