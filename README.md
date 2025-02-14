
# Cold Mailing Application for Research Internship Requests

## Overview

This application streamlines the process of drafting cold emails for research internship opportunities. Users can simply input a professor's name, upload their CV, and optionally provide information about the professor's work. The system then gathers relevant details from Google and generates a well-crafted cold email using an LLM.

 ## Features

Professor Name Input: Users provide the professor's name to initiate the email generation process.

CV Upload: Users upload their CV, which is used to personalize the email.

Optional Research Work Input: Users can optionally enter research topics or keywords related to the professor's work.

Automated Research: The system retrieves additional information about the professor from Google.

LLM-Powered Email Generation: The application generates a professional and tailored cold email for the research internship request.

## Installation for Frontend


``` bash
https://github.com/Harsh-BH/MailCold.git

cd client/mailcold

pnpm run dev

```
## Installation for Backend


``` bash
https://github.com/Harsh-BH/MailCold.git

cd server

pip install -r requirements.txt

uvicorn app.main:app --host 0.0.0.0 --port 7000

```



