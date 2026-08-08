from urllib.parse import urlparse


def check(url: str):
    hostname = urlparse(url).hostname or ""

    if "xn--" in hostname.lower():
        return 0, "Punycode Domain Detected"

    return 5, "No Punycode Detected"