from urllib.parse import urlparse


def check(url: str):
    hostname = urlparse(url).hostname or ""

    if "-" in hostname:
        return 0, "Hyphenated Domain Detected"

    return 5, "No Hyphenated Domain"