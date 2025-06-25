import pytest
from fastapi.testclient import TestClient
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.main import app
from app.config import settings

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert settings.PROJECT_NAME in data["message"]

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_get_languages():
    response = client.get("/api/v1/languages")
    assert response.status_code == 200
    data = response.json()
    assert "languages" in data
    assert len(data["languages"]) > 0

def test_review_empty_code():
    response = client.post(
        "/api/v1/review",
        json={"code": "", "language": "python"}
    )
    assert response.status_code == 400

def test_review_valid_code():
    test_code = """
def hello_world():
    print("Hello, World!")
    
hello_world()
"""
    response = client.post(
        "/api/v1/review",
        json={"code": test_code, "language": "python"}
    )
    
    if settings.OPENAI_API_KEY:
        assert response.status_code == 200
        data = response.json()
        assert "overall_score" in data
        assert "summary" in data
        assert "suggestions" in data