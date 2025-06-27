import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    API_V1_STR = "/api/v1"
    PROJECT_NAME = "AI Code Review Assistant"
    VERSION = "0.1.0"
    
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
    OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-3.5-turbo")
    
    BACKEND_CORS_ORIGINS = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://ai-code-review-alb-2000851462.us-east-1.elb.amazonaws.com",
    ]
    
    DEBUG = os.getenv("DEBUG", "True").lower() == "true"
    
    RATE_LIMIT_MAX_REQUESTS = int(os.getenv("RATE_LIMIT_MAX_REQUESTS", "10"))
    RATE_LIMIT_WINDOW_HOURS = int(os.getenv("RATE_LIMIT_WINDOW_HOURS", "24"))

settings = Settings()