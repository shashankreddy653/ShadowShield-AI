from urllib.parse import urlparse


def check(url: str):
    hostname = urlparse(url).hostname or ""

    if hostname.count(".") >= 4:
        return -10, "Excessive Dots Detected"

    return 0, "Normal Dot Count"