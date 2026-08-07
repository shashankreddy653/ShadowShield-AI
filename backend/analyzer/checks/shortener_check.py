from urllib.parse import urlparse

SHORTENERS = {
    "bit.ly",
    "tinyurl.com",
    "t.co",
    "goo.gl",
    "ow.ly",
    "buff.ly",
    "rebrand.ly",
    "is.gd"
}


def check(url: str):
    hostname = urlparse(url).hostname or ""

    if hostname.lower() in SHORTENERS:
        return -15, "URL Shortener Detected"

    return 0, "No URL Shortener Used"