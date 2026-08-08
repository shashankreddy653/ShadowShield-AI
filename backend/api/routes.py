from fastapi import APIRouter

from api.schemas import URLRequest, LeakRequest
from analyzer.analyzer import analyze
from leak_detector.detector import detect
from leak_detector.rewriter import rewrite_text

from database import (
    get_website_history,
    save_website_scan,
    save_leak_scan,
    get_leak_history,
)

router = APIRouter(
    prefix="/api/v1",
    tags=["ShadowShield API v1"]
)


@router.get("/")
def home():
    return {
        "message": "Welcome to ShadowShield AI API"
    }


@router.get("/health")
def health():
    return {
        "status": "Healthy"
    }


@router.post("/analyze")
def analyze_url(request: URLRequest):

    result = analyze(request.url)

    data = result["data"]

    save_website_scan(
        url=data["url"],
        score=data["score"],
        risk=data["risk"],
        ai_summary=data["ai_explanation"]
    )

    return result


@router.get("/history")
def history():
    return get_website_history()


@router.post("/leak-detect")
def leak_detect(request: LeakRequest):

    result = detect(request.text)

    rewritten = rewrite_text(result["redacted_text"])

    save_leak_scan(
        original=request.text,
        redacted=result["redacted_text"],
        rewritten=rewritten,
        secrets_found=result["total"]
    )

    return {
        "success": True,
        "findings": result["findings"],
        "redacted_text": result["redacted_text"],
        "rewritten_text": rewritten
    }


@router.get("/leak-history")
def leak_history():
    return get_leak_history()