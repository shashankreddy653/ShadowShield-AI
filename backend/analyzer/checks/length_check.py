def check(url: str):
    if len(url) > 75:
        return 0, "Suspiciously Long URL"

    return 5, "URL Length Normal"