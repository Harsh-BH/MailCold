

# Cold Mailing Application for Research Internship Requests

## Overview

This application streamlines the process of drafting cold emails for research internship opportunities. Users simply input a professor's name, upload their CV, and optionally provide information about the professor’s research. The system gathers relevant data and generates a tailored, professional cold email using an LLM.

## Features

* 🔍 **Professor Name Input** – Users provide a professor’s name to begin the email generation process.
* 📄 **CV Upload** – Users upload their CV to allow the system to personalize the email content.
* 🧠 **Optional Research Keywords** – Users can add research topics or keywords related to the professor’s work.
* 🌐 **Automated Research** – The system scrapes Google for additional context about the professor.
* ✉️ **LLM-Powered Email Generation** – A professional and personalized cold email is generated using GPT via Langchain.

---

## Technologies Used

* **Frontend**: React, Vite
* **Backend**: Python, FastAPI
* **NLP**: OpenAI GPT (via Langchain)
* **Data Fetching**: Google Search API
* **CV Handling**: File processing in Python

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Harsh-BH/MailCold.git
cd MailCold
```

### 2. Frontend Setup

```bash
cd client/mailcold
pnpm install
pnpm run dev
```

### 3. Backend Setup

```bash
cd ../../server
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 7000
```

### 4. Environment Variables

Create a `.env` file inside the `server/` folder with the following structure:

```
OPENAI_API_KEY=your_openai_api_key
GOOGLE_API_KEY=your_google_api_key
GOOGLE_CSE_ID=your_custom_search_engine_id
```

> 🔐 Make sure **not to share** this file publicly.

---

## Usage

1. Launch the frontend (`pnpm run dev`) and backend (`uvicorn ...`) servers.
2. Open the web application in your browser.
3. Enter the professor's name.
4. Upload your CV file (PDF format).
5. (Optional) Enter keywords or topics related to the professor’s research.
6. Click **"Generate Email"**.
7. Review the generated cold email and copy it for use.

---

## Folder Structure

```
MailCold/
├── client/
│   └── mailcold/          # Frontend (React)
└── server/                # Backend (FastAPI)
    ├── app/
    └── .env               # Environment configuration
```

---

## Future Enhancements

* 📧 Email sending integration via Gmail/Outlook API.
* 🧬 Enhanced personalization using advanced CV parsing.
* 🤖 Support for alternative LLM providers (Claude, Mistral, etc.).
* 🗃️ History and template saving.

---

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## License

This project is licensed under the MIT License.

