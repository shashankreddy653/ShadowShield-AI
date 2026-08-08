import re

from leak_detector.patterns import PATTERNS


def detect(text: str):

    findings = []
    redacted = text

    for name, pattern in PATTERNS.items():

        matches = list(re.finditer(pattern, text))

        if matches:

            findings.append({
                "type": name,
                "count": len(matches)
            })

            redacted = re.sub(
                pattern,
                f"[REDACTED {name}]",
                redacted,
                flags=re.IGNORECASE
            )

    return {
        "findings": findings,
        "redacted_text": redacted,
        "total": len(findings)
    }