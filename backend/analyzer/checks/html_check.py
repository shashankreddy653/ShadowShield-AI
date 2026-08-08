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
        # +1 if safe
        # --------------------------------------------------

        forms = soup.find_all("form")

        if forms:

            reasons.append("Login Form Detected")

            same_domain = True

            for form in forms:

                action = form.get("action", "")

                if action:

                    action_url = urljoin(response.url, action)

                    action_domain = urlparse(action_url).netloc

                    if (
                        action_domain != ""
                        and action_domain != current_domain
                    ):

                        same_domain = False

                        reasons.append(
                            f"Form Submits to External Domain ({action_domain})"
                        )

            if same_domain:
                score += 1
                reasons.append("Forms Submit to Same Domain")

        else:

            score += 1
            reasons.append("No Login Form")

        # --------------------------------------------------
        # PASSWORD FIELD
        # +1 if no password field
        # --------------------------------------------------

        passwords = soup.find_all(
            "input",
            {"type": "password"}
        )

        if passwords:

            reasons.append("Password Field Detected")

        else:

            score += 1
            reasons.append("No Password Field")

        # --------------------------------------------------
        # HIDDEN IFRAMES
        # +1 if none detected
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
                break

        if hidden:

            reasons.append("Hidden iFrame Detected")

        else:

            score += 1
            reasons.append("No Hidden iFrame")

        # --------------------------------------------------
        # EXTERNAL JAVASCRIPT
        # +1 if not excessive
        # --------------------------------------------------

        external = 0

        for script in soup.find_all("script", src=True):

            src = script["src"]

            script_url = urljoin(response.url, src)

            domain = urlparse(script_url).netloc

            if domain != current_domain:

                external += 1

        if external > 15:

            reasons.append(
                f"Too Many External Scripts ({external})"
            )

        else:

            score += 1

            reasons.append(
                f"External Scripts : {external}"
            )

        # --------------------------------------------------
        # FINAL HTML SCORE
        # Maximum = 5
        # --------------------------------------------------

        score = min(score, 5)

    except Exception:

        reasons.append("Unable to Analyze HTML")

        return 0, reasons

    return score, reasons