from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import PydanticOutputParser
from typing import Dict
import logging
from ..config import settings
from ..models import CodeReviewResponse, ReviewSuggestion

logger = logging.getLogger(__name__)

class AICodeReviewer:
    def __init__(self):

        if not settings.OPENAI_API_KEY:
            raise ValueError("OpenAI API key not found in environment variables")
            
        self.llm = ChatOpenAI(
            model=settings.OPENAI_MODEL,
            temperature=0.3,
            api_key=settings.OPENAI_API_KEY
        )
        self.parser = PydanticOutputParser(pydantic_object=CodeReviewResponse)
        
    def create_review_prompt(self) -> ChatPromptTemplate:

        prompt_template = """You are an expert code reviewer. Analyze the following {language} code and provide a comprehensive review.

Code to review:
\\```{language}
{code}
\```

Context (if any): {context}

Please provide:
1. An overall quality score (0-10)
2. A brief summary of the code quality
3. Specific suggestions for improvement including:
   - Line numbers (if applicable)
   - Severity levels (error/warning/info)
   - Categories (bug/style/performance/security)
   - Clear messages and suggestions

Format your response as JSON matching this structure:
{format_instructions}

Focus on:
- Following {language} best practices and style guides
- Identifying potential bugs or errors
- Security vulnerabilities
- Performance optimizations
- Code readability and maintainability
"""
        
        return ChatPromptTemplate.from_template(prompt_template)
    
    async def review_code(self, code: str, language: str, context: str = None) -> CodeReviewResponse:
        try:
            prompt = self.create_review_prompt()
            
            formatted_prompt = prompt.format(
                code=code,
                language=language,
                context=context or "No additional context provided",
                format_instructions=self.parser.get_format_instructions()
            )
            
            response = await self.llm.ainvoke(formatted_prompt)
            
            try:
                parsed_response = self.parser.parse(response.content)
                return parsed_response
            except Exception as parse_error:
                logger.error(f"Failed to parse LLM response: {parse_error}")
                logger.error(f"Raw response: {response.content}")
                return self._create_fallback_response(response.content)
                
        except Exception as e:
            logger.error(f"Error during code review: {str(e)}")
            raise

    def _create_fallback_response(self, raw_response: str) -> CodeReviewResponse:
        suggestions = []
        
        lines = raw_response.split('\n')
        for line in lines:
            line = line.strip()
            if line.startswith('- ') or line.startswith('* '):
                suggestions.append(ReviewSuggestion(
                    severity="info",
                    category="general",
                    message=line[2:],
                    suggestion=None
                ))
        
        if not suggestions:
            suggestions.append(ReviewSuggestion(
                severity="info",
                category="general",
                message="Code review completed. Please check the detailed response.",
                suggestion=raw_response[:300] + "..." if len(raw_response) > 300 else raw_response
            ))
        
        return CodeReviewResponse(
            overall_score=5.0,
            summary="Code review completed with parsing issues. See suggestions for details.",
            suggestions=suggestions,
            explanation="The AI response could not be properly parsed into the expected format."
        )

_ai_reviewer = None

def get_ai_reviewer() -> AICodeReviewer:
    global _ai_reviewer
    if _ai_reviewer is None:
        _ai_reviewer = AICodeReviewer()
    return _ai_reviewer