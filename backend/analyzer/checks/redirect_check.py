import requests


def check(url: str):
    try:
        response = requests.get(
            url,
            allow_redirects=True,
            timeout=5,
            headers={
                "User-Agent": "Mozilla/5.0"
            }
        )

        redirects = len(response.history)

        if redirects >= 3:
            return -20, f"Multiple Redirects Detected ({redirects})"

        elif redirects > 0:
            return -5, f"{redirects} Redirect(s) Found"

        return 10, "No Redirects"

    except Exception:
        return 0, "Redirect Check Failed"