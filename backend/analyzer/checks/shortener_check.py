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


from urllib.parse import urlparse


def check(url: str):

    hostname = urlparse(url).hostname or ""

    if hostname.lower() in SHORTENERS:
        return 0, "URL Shortener Detected"

    return 5, "No URL Shortener Used"