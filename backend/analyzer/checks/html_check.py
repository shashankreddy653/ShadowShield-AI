import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin


def check(url: str):

    score = 0
    reasons = []

    try:

        response = requests.get(
            url,
            timeout=5,
            headers={
                "User-Agent": "Mozilla/5.0"
            }
        )

        soup = BeautifulSoup(response.text, "html.parser")

        current_domain = urlparse(response.url).netloc

        # --------------------------------------------------
        # LOGIN FORM DETECTION
        # --------------------------------------------------

        forms = soup.find_all("form")

        if forms:

            reasons.append("Login Form Detected")

            for form in forms:

                action = form.get("action", "")

                if action:

                    action_url = urljoin(response.url, action)

                    action_domain = urlparse(action_url).netloc

                    if action_domain != "" and action_domain != current_domain:

                        score -= 30

                        reasons.append(
                            f"Form Submits to External Domain ({action_domain})"
                        )

        else:

            reasons.append("No Login Form")

        # --------------------------------------------------
        # PASSWORD FIELD
        # --------------------------------------------------

        passwords = soup.find_all("input", {"type": "password"})

        if passwords:
            reasons.append("Password Field Detected")
        else:
            reasons.append("No Password Field")

        # --------------------------------------------------
        # HIDDEN IFRAMES
        # --------------------------------------------------

        hidden = False

        for iframe in soup.find_all("iframe"):

            style = iframe.get("style", "").lower()

            if (
                "display:none" in style
                or "visibility:hidden" in style
                or iframe.get("hidden") is not None
            ):

                hidden = True

        if hidden:

            score -= 20
            reasons.append("Hidden iFrame Detected")

        else:

            reasons.append("No Hidden iFrame")

        # --------------------------------------------------
        # EXTERNAL JAVASCRIPT
        # --------------------------------------------------

        external = 0

        for script in soup.find_all("script", src=True):

            src = script["src"]

            script_url = urljoin(response.url, src)

            domain = urlparse(script_url).netloc

            if domain != current_domain:

                external += 1

        if external > 15:

            score -= 10

            reasons.append(f"Too Many External Scripts ({external})")

        else:

            reasons.append(f"External Scripts : {external}")

    except Exception:

        return -20, ["Unable to Analyze HTML"]

    return score, reasons