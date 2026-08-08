def check(url: str):
    if "@" in url:
        return 0, "@ Symbol Found in URL"

    return 5, "No @ Symbol Found"