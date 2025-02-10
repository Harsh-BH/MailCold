import requests
from bs4 import BeautifulSoup
from app.config import GOOGLE_API_KEY, GOOGLE_CSE_ID
import re

def google_search(query: str, site: str = ""):
    """Search Google for a query, optionally restricting to a specific site."""
    if not GOOGLE_API_KEY or not GOOGLE_CSE_ID:
        print("Google API key or CSE ID is missing. Returning empty results.")
        return []

    search_query = f"{query} site:{site}" if site else query
    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": GOOGLE_API_KEY,
        "cx": GOOGLE_CSE_ID,
        "q": search_query,
    }

    try:
        resp = requests.get(url, params=params, timeout=10)
        data = resp.json()
        return data.get("items", [])
    except Exception as e:
        print(f"Error fetching search results: {e}")
        return []

def scrape_page(url: str) -> str:
    try:
        r = requests.get(url, timeout=10)
        if r.status_code != 200:
            return ""
        soup = BeautifulSoup(r.text, "html.parser")
        return soup.get_text(separator="\n", strip=True)
    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return ""



def get_professor_projects(prof_name: str):
    """Fetch project-related pages of a professor from Google Scholar & ResearchGate."""
    sources = {
        "Google Scholar": "scholar.google.com",
        "ResearchGate": "researchgate.net"
    }

    project_links = {}

    for source, site in sources.items():
        results = google_search(f"{prof_name} research projects", site)
        project_links[source] = [item["link"] for item in results]

    # Scrape content from the links
    project_details = {}
    for source, links in project_links.items():
        project_details[source] = [scrape_page(url) for url in links]

    return project_details

def extract_emails(text: str):
    """Extracts university email addresses from raw text."""
    email_pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(edu|ac\.uk|ac\.in|ac\.ca)"
    emails = re.findall(email_pattern, text)
    return list(set(emails))  # Remove duplicates

def extract_faculty_info(text: str):
    """Extracts possible professor names (basic heuristic approach)."""
    lines = text.split("\n")
    faculty_names = []

    for line in lines:
        if "," in line and "@" not in line:  # Possible format: "John Doe, Professor of CS"
            faculty_names.append(line.strip())

    return list(set(faculty_names))  # Remove duplicates

def get_university_faculty(university_domain: str):
    """Fetches all faculty names and emails from a university website."""
    directory_pages = google_search(university_domain)

    faculty_data = []

    for page in directory_pages:
        page_text = scrape_page(page)
        emails = extract_emails(page_text)
        faculty_names = extract_faculty_info(page_text)

        # Pair emails with names if possible, otherwise list them separately
        for email in emails:
            matched_name = next((name for name in faculty_names if name.split()[0].lower() in email.lower()), "Unknown")
            faculty_data.append({"Name": matched_name, "Email": email})

    return faculty_data
