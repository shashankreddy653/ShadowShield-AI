from fastapi import APIRouter
from api.schemas import URLRequest
from analyzer.analyzer import analyze

# API Version 1 Router
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
    return analyze(request.url)