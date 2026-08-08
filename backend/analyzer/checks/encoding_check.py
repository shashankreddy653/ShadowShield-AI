def check(url: str):

    if "%" in url:
        return 0, "Encoded Characters Detected"

    return 5, "No URL Encoding"