from fastapi import APIRouter, HTTPException, Depends
import logging

from ..models import CodeReviewRequest, CodeReviewResponse
from ..services.ai_reviewer import get_ai_reviewer, AICodeReviewer
from ..config import settings

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix=f"{settings.API_V1_STR}",
    tags=["review"]
)

@router.post("/review", response_model=CodeReviewResponse)
async def review_code(
    request: CodeReviewRequest,
    ai_reviewer: AICodeReviewer = Depends(get_ai_reviewer)
):
    try:
        logger.info(f"Processing review request for {request.language} code")
        
        if not request.code.strip():
            raise HTTPException(
                status_code=400, 
                detail="Code cannot be empty"
            )
        
        if len(request.code) > 10000:
            raise HTTPException(
                status_code=400,
                detail="Code is too long. Maximum 10000 characters allowed."
            )
        
        result = await ai_reviewer.review_code(
            code=request.code,
            language=request.language,
            context=request.context
        )
        
        logger.info(f"Review completed with score: {result.overall_score}")
        return result
        
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error during code review: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail="An error occurred during code review. Please try again."
        )

@router.get("/languages")
async def get_supported_languages():
    return {
        "languages": [
            {"value": "python", "label": "Python"},
            {"value": "javascript", "label": "JavaScript"},
            {"value": "typescript", "label": "TypeScript"},
            {"value": "java", "label": "Java"},
            {"value": "go", "label": "Go"},
            {"value": "rust", "label": "Rust"},
            {"value": "cpp", "label": "C++"},
            {"value": "csharp", "label": "C#"},
            {"value": "php", "label": "PHP"},
            {"value": "ruby", "label": "Ruby"},
        ]
    }

@router.get("/review/example")
async def get_example_code():
    return {
        "examples": {
            "python": """def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")""",
            "javascript": """function isPalindrome(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}

console.log(isPalindrome("A man, a plan, a canal: Panama"));"""
        }
    }