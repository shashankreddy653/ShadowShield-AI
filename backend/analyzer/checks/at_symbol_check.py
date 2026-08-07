def check(url: str):
    if "@" in url:
        return -20, "@ Symbol Found in URL"

    return 0, "No @ Symbol Found"