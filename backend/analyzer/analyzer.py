from database import save_website_scan
from ai.gemini import explain
from analyzer.checks.https_check import check as https_check
from analyzer.checks.ip_check import check as ip_check
from analyzer.checks.length_check import check as length_check
from analyzer.checks.at_symbol_check import check as at_check
from analyzer.checks.shortener_check import check as shortener_check
from analyzer.checks.subdomain_check import check as subdomain_check
from analyzer.checks.punycode_check import check as punycode_check
from analyzer.checks.keyword_check import check as keyword_check
from analyzer.checks.hyphen_check import check as hyphen_check
from analyzer.checks.encoding_check import check as encoding_check
from analyzer.checks.dot_check import check as dot_check

from analyzer.checks.whois_check import check as whois_check
from analyzer.checks.ssl_check import check as ssl_check
from analyzer.checks.redirect_check import check as redirect_check
from analyzer.checks.html_check import check as html_check


from analyzer.risk_engine import calculate
from analyzer.checks.brand_check import check as brand_check


def analyze(url: str):

    score = 100
    reasons = []

    checks = [
        https_check,
        ip_check,
        length_check,
        at_check,
        shortener_check,
        subdomain_check,
        punycode_check,
        keyword_check,
        hyphen_check,
        encoding_check,
        dot_check,
        brand_check,
        whois_check,
        ssl_check,
        redirect_check
    ]

    # URL Checks
    # URL Checks
    for check in checks:

        deduction, reason = check(url)

        score += deduction

        if isinstance(reason, list):
            reasons.extend(reason)
        else:
            reasons.append(reason)
    

    # HTML Analysis
    html_score, html_reasons = html_check(url)

    score += html_score
    reasons.extend(html_reasons)

    score, risk = calculate(score)
    ai_explanation = explain(
    url=url,
    score=score,
    risk=risk,
    reasons=reasons
)
    save_website_scan(
    url=url,
    score=score,
    risk=risk,
    ai_summary=ai_explanation
)

    return {
        "success": True,
        "message": "Analysis completed successfully",
        "data": {
            "url": url,
            "score": score,
            "risk": risk,
            "reasons": reasons,
            "ai_explanation": ai_explanation
        }
    }