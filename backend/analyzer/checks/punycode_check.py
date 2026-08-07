from urllib.parse import urlparse


def check(url: str):
    hostname = urlparse(url).hostname or ""

    if "xn--" in hostname.lower():
        return -25, "Punycode Domain Detected"

    return 0, "No Punycode Detected"