import whois
from urllib.parse import urlparse
from datetime import datetime


def check(url: str):
    try:
        domain = urlparse(url).hostname

        if not domain:
            return 0, "WHOIS Check Skipped"

        data = whois.whois(domain)

        creation = data.creation_date

        if isinstance(creation, list):
            creation = creation[0]

        if not creation:
            return -10, "Domain Age Unknown"

        age = (datetime.now() - creation).days

        if age < 180:
            return -25, f"Recently Registered Domain ({age} days)"

        return 0, f"Old Domain ({age} days)"

    except Exception:
        return -10, "WHOIS Lookup Failed"