from urllib.parse import urlparse


def check(url: str):
    hostname = urlparse(url).hostname or ""

    if "-" in hostname:
        return -10, "Hyphenated Domain Detected"

    return 0, "No Hyphenated Domain"