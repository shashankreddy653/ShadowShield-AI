from analyzer.checks.https_check import check as https_check
from analyzer.checks.ip_check import check as ip_check
from analyzer.checks.length_check import check as length_check
from analyzer.checks.at_symbol_check import check as at_check
from analyzer.checks.shortener_check import check as shortener_check
from analyzer.checks.subdomain_check import check as subdomain_check

from analyzer.risk_engine import calculate


def analyze(url: str):

    score = 100
    reasons = []

    checks = [
        https_check,
        ip_check,
        length_check,
        at_check,
        shortener_check,
        subdomain_check
    ]

    for check in checks:

        deduction, reason = check(url)

        score += deduction
        reasons.append(reason)

    score, risk = calculate(score)

    return {
        "success": True,
        "message": "Analysis completed successfully",
        "data": {
            "url": url,
            "score": score,
            "risk": risk,
            "reasons": reasons
        }
    }