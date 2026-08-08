import whois
from urllib.parse import urlparse
from datetime import datetime, timezone


def check(url: str):

    try:
        # Extract domain
        domain = urlparse(url).hostname

        if not domain:
            return 0, "WHOIS Check Skipped"

        # Remove www.
        domain = domain.lower()

        if domain.startswith("www."):
            domain = domain[4:]

        # WHOIS lookup
        data = whois.whois(domain)

        # Get creation date
        creation = data.creation_date

        if isinstance(creation, list):
            creation = next(
                (date for date in creation if date),
                None
            )

        if not creation:
            return 0, "WHOIS: Creation Date Unavailable"

        # Make datetime timezone-safe
        if creation.tzinfo is not None:
            now = datetime.now(timezone.utc)
        else:
            now = datetime.now()

        age = (now - creation).days

        # --------------------------------------------------
        # DOMAIN AGE SCORING
        # --------------------------------------------------

        if age < 180:

            return 0, f"Recently Registered Domain ({age} days)"

        elif age < 365:

            return 3, f"Domain Age: {age} days"

        elif age < 1095:  # 1-3 years

            return 5, f"Domain Age: {age} days"

        elif age < 3650:  # 3-10 years

            return 8, f"Domain Age: {age} days"

        else:  # More than 10 years

            return 10, f"Domain Age: {age} days"

    except Exception as e:

        print(f"WHOIS error for {url}: {e}")

        return 0, "WHOIS Lookup Unavailable"