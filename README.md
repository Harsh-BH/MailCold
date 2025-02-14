# Cold Mailing Application for Research Internship Requests

## Overview
This application streamlines the process of drafting cold emails for research internship opportunities. Users can simply input a professor's name, upload their CV, and optionally provide information about the professor's work. The system then gathers relevant details from Google and generates a well-crafted cold email using an LLM.

## Features
- **Professor Name Input:** Users provide the professor's name to initiate the email generation process.
- **CV Upload:** Users upload their CV, which is used to personalize the email.
- **Optional Research Work Input:** Users can optionally enter research topics or keywords related to the professor's work.
- **Automated Research:** The system retrieves additional information about the professor from Google.
- **LLM-Powered Email Generation:** The application generates a professional and tailored cold email for the research internship request.

## Installation for Frontend
```sh
https://github.com/Harsh-BH/MailCold.git

cd client/mailcold

pnpm run dev
```

## Installation for Backend
```sh
https://github.com/Harsh-BH/MailCold.git

cd server

pip install -r requirements.txt

uvicorn app.main:app --host 0.0.0.0 --port 7000
```

## Usage
1. Open the application and enter the professor's name.
2. Upload your CV.
3. Optionally, enter research topics related to the professor.
4. Click the "Generate Email" button.
5. The system will retrieve relevant information and generate a tailored email.
6. Review and copy the email for sending.

## Technologies Used
- **Python**
- **FastAPI**
- **Google Search API**
- **OpenAI GPT (Using Langchain)**
- **File Handling for CV Processing**

## Future Enhancements
- Integration with email services for direct sending.
- Improved personalization based on CV content analysis.
- Support for multiple LLM models.

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute.

## Folder Structure
- **client/mailcold/** - Frontend code
- **server/** - Backend code

## License
This project is licensed under the MIT License.

