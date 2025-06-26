# Contributing to AI Code Review Assistant

First off, thank you for considering contributing to AI Code Review Assistant! It's people like you that make this tool such a great resource for developers worldwide.

## 🤝 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to yijun.x@berkeley.edu.

## 🚀 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots and animated GIFs if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and explain which behavior you expected to see instead**
- **Explain why this enhancement would be useful**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code follows the style guidelines
6. Issue that pull request!

## 💻 Development Setup

### Prerequisites

- Python 3.11+
- Node.js 20+
- Docker Desktop
- AWS CLI (for deployment)
- Git

### Local Development

1. **Clone your fork**
   ```bash
   git clone https://github.com/yijun-xiang/ai-code-review-assistant.git
   cd ai-code-review-assistant
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cp .env.example .env
   # Add your OpenAI API key to .env
   uvicorn app.main:app --reload
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.local.example .env.local
   npm run dev
   ```

4. **Run with Docker**
   ```bash
   docker-compose up --build
   ```

## 📋 Style Guidelines

### Python Code Style

We follow PEP 8 with these additions:
- Use type hints for all functions
- Maximum line length: 100 characters
- Use docstrings for all public functions
- Run `black` for formatting
- Run `flake8` for linting

Example:
```python
def analyze_code(code: str, language: str) -> CodeReviewResponse:
    """
    Analyze code and return review suggestions.
    
    Args:
        code: The code to analyze
        language: Programming language of the code
        
    Returns:
        CodeReviewResponse with suggestions
    """
    # Implementation here
```

### TypeScript/JavaScript Code Style

We use ESLint and Prettier:
- Use functional components with hooks
- Use TypeScript for all new code
- Prefer named exports
- Use meaningful variable names

Example:
```typescript
export const CodeEditor: React.FC<CodeEditorProps> = ({ 
  code, 
  language, 
  onChange 
}) => {
  // Component implementation
}
```

### Git Commit Messages

We use conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only changes
- `style:` Code style changes (formatting, semicolons, etc)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example:
```
feat: add support for Rust language analysis

- Add Rust to supported languages list
- Update language detection logic
- Add Rust-specific linting rules
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest tests/ -v --cov=app
```

### Frontend Tests
```bash
cd frontend
npm test
npm run test:coverage
```

### E2E Tests
```bash
cd frontend
npm run test:e2e
```

## 📦 Adding New Features

### Adding a New Language

1. Update `SUPPORTED_LANGUAGES` in `frontend/utils/constants.ts`
2. Add example code in `EXAMPLE_CODES`
3. Update backend language validation
4. Add language-specific prompts if needed
5. Update documentation

### Adding New Analysis Features

1. Update the `ReviewSuggestion` model in backend
2. Modify the AI prompt in `ai_reviewer.py`
3. Update frontend to display new suggestion types
4. Add tests for the new feature

## 🚀 Deployment Process

1. **Testing**: All tests must pass
2. **Code Review**: At least one maintainer approval
3. **Documentation**: Update if needed
4. **Version Bump**: Update version numbers
5. **Merge**: Squash and merge to main
6. **Deploy**: Automatic via GitHub Actions

## 📝 Documentation

- Update README.md for user-facing changes
- Update API documentation for endpoint changes
- Add inline comments for complex logic
- Update architecture diagrams if needed

## 🏆 Recognition

Contributors will be recognized in:
- The README.md contributors section
- Release notes
- Special thanks in project documentation

## ❓ Questions?

Feel free to:
- Open an issue for questions
- Join our discussions
- Contact maintainers directly

## 📜 License

By contributing to AI Code Review Assistant, you agree that your contributions will be licensed under its MIT license.

---

Thank you for contributing! 🎉