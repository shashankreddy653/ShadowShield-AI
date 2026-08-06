from urllib.parse import urlparse


def check(url: str):
    parsed_url = urlparse(url)

    if parsed_url.scheme == "https":
        return 0, "HTTPS Enabled"

    return -30, "HTTPS Not Enabled"