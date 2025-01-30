import requests
from bs4 import BeautifulSoup
from app.config import GOOGLE_API_KEY, GOOGLE_CSE_ID

def google_search(query: str):
    """
    Use the Google Custom Search Engine (CSE) to find relevant pages.
    """
    if not GOOGLE_API_KEY or not GOOGLE_CSE_ID:
        print("Google API key or CSE ID is missing. Returning empty results.")
        return []

    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": GOOGLE_API_KEY,
        "cx": GOOGLE_CSE_ID,
        "q": query,
    }
    resp = requests.get(url, params=params)
    data = resp.json()
    items = data.get("items", [])
    return items

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
