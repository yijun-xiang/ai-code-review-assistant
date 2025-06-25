from pydantic import BaseModel
from typing import List, Optional

class CodeReviewRequest(BaseModel):
    code: str
    language: str = "python"
    context: Optional[str] = None

class ReviewSuggestion(BaseModel):
    line_number: Optional[int] = None
    severity: str  # "error", "warning", "info"
    category: str  # "bug", "style", "performance", "security"
    message: str
    suggestion: Optional[str] = None

class CodeReviewResponse(BaseModel):
    overall_score: float
    summary: str
    suggestions: List[ReviewSuggestion]
    explanation: Optional[str] = None