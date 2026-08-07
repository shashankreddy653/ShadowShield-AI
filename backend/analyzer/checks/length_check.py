def check(url: str):
    if len(url) > 75:
        return -15, "Suspiciously Long URL"

    return 0, "URL Length Normal"