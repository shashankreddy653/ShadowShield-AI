from urllib.parse import urlparse

KEYWORDS = [
    "login",
    "verify",
    "secure",
    "update",
    "account",
    "bank",
    "signin",
    "password"
]


def check(url: str):
    path = urlparse(url).path.lower()

    for word in KEYWORDS:
        if word in path:
            return -15, f"Suspicious Keyword Detected ({word})"

    return 0, "No Suspicious Keywords"