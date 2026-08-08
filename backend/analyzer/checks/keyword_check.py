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
            return 0, f"Suspicious Keyword Detected ({word})"

    return 5, "No Suspicious Keywords"