from urllib.parse import urlparse


def check(url: str):
    hostname = urlparse(url).hostname or ""

    if hostname.count(".") >= 4:
        return 0, "Excessive Dots Detected"

    return 5, "Normal Dot Count"