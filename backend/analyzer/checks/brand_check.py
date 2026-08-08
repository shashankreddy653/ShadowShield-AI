from urllib.parse import urlparse


TRUSTED_BRANDS = [
    "google",
    "paypal",
    "microsoft",
    "amazon",
    "apple",
    "facebook",
    "instagram",
    "linkedin",
    "netflix",
    "github",
    "dropbox",
    "bank",
    "icici",
    "hdfc",
    "sbi",
    "axis"
]


def check(url: str):

    hostname = (urlparse(url).hostname or "").lower()

    score = 0
    reasons = []

    for brand in TRUSTED_BRANDS:

        if brand in hostname:

            # Legitimate domain
            if (
                hostname == f"{brand}.com"
                or hostname.endswith(f".{brand}.com")
                or hostname == f"www.{brand}.com"
            ):
                score += 10

                reasons.append(
                    f"Trusted {brand.title()} Domain"
                )

            else:
                # Brand appears in suspicious domain
                score += 0

                reasons.append(
                    f"Possible Brand Impersonation ({brand})"
                )

    if not reasons:
        reasons.append("No Brand Impersonation")

    return score, reasons