export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const SUPPORTED_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
];

export const DEFAULT_CODE = `// Welcome to AI Code Review Assistant!
// Start typing to begin your code review journey...

function calculateFibonacci(n) {
  // TODO: Optimize this recursive approach
  if (n <= 1) return n;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}

class UserDataProcessor {
  constructor(userData) {
    this.userData = userData;
  }
  
  processData() {
    // Transform user data for analytics
    return this.userData.map(user => {
      return {
        ...user,
        score: user.score * 2
      };
    });
  }
}

// Start coding and get instant AI-powered feedback!`;

export function getExampleCode(language: string): string {
  return EXAMPLE_CODES[language] || EXAMPLE_CODES.javascript || DEFAULT_CODE;
}

export const EXAMPLE_CODES: Record<string, string> = {
  javascript: DEFAULT_CODE,
  typescript: `// TypeScript example - Start typing to replace this code

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

class UserService {
  private users: User[] = [];
  
  addUser(user: User): void {
    // Add user to the collection
    this.users.push(user);
    console.log(\`User \${user.name} added successfully\`);
  }
  
  findUserById(id: number): User | undefined {
    // Find user by their unique ID
    return this.users.find(user => user.id === id);
  }
  
  getActiveUsers(): User[] {
    // Filter only active users
    return this.users.filter(user => user.isActive);
  }
}

// Your code goes here...`,
  python: `# Python example - Start typing to replace this code

def calculate_fibonacci(n):
    """Calculate Fibonacci number recursively"""
    if n <= 1:
        return n
    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)

class UserDataProcessor:
    """Process user data for analytics"""
    
    def __init__(self, user_data):
        self.user_data = user_data
    
    def process_data(self):
        """Transform user scores"""
        return [
            {**user, 'score': user['score'] * 2}
            for user in self.user_data
        ]
    
    def get_top_users(self, limit=10):
        """Get top performing users"""
        sorted_users = sorted(
            self.user_data, 
            key=lambda x: x['score'], 
            reverse=True
        )
        return sorted_users[:limit]

# Start coding here...`,
};