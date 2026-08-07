def check(url: str):

    if "%" in url:
        return -15, "Encoded Characters Detected"

    return 0, "No URL Encoding"