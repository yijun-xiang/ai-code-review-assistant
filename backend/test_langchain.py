import asyncio
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.services.ai_reviewer import AICodeReviewer
from app.config import settings

async def test_ai_reviewer():
    print("Testing AI Code Reviewer with LangChain...")
    print(f"Using model: {settings.OPENAI_MODEL}")
    
    test_code = """
def calculate_average(numbers):
    sum = 0
    for n in numbers:
        sum += n
    return sum / len(numbers)

result = calculate_average([1, 2, 3, 4, 5])
print(f"Average: {result}")
"""
    
    try:
        reviewer = AICodeReviewer()
        
        print("\nAnalyzing code...")
        result = await reviewer.review_code(
            code=test_code,
            language="python",
            context="This is a simple function to calculate average"
        )
        
        print(f"\nOverall Score: {result.overall_score}/10")
        print(f"Summary: {result.summary}")
        print("\nSuggestions:")
        for i, suggestion in enumerate(result.suggestions, 1):
            print(f"{i}. [{suggestion.severity}] {suggestion.category}: {suggestion.message}")
            if suggestion.suggestion:
                print(f"   Fix: {suggestion.suggestion}")
        
        if result.explanation:
            print(f"\nExplanation: {result.explanation}")
            
    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_ai_reviewer())