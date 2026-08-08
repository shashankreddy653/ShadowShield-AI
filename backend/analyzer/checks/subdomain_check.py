from urllib.parse import urlparse


def check(url: str):
    hostname = urlparse(url).hostname or ""

    if hostname.count(".") >= 3:
        return 0, "Too Many Subdomains Detected"

    return 5, "Normal Number of Subdomains"