from pydantic import BaseModel

class URLRequest(BaseModel):
    url: str

class AnalyzeResponse(BaseModel):
    score: int
    risk: str
    reasons: list[str]