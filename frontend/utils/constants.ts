export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

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
    this.users.push(user);
    console.log(\`User \${user.name} added successfully\`);
  }
  
  findUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
  
  getActiveUsers(): User[] {
    return this.users.filter(user => user.isActive);
  }
}`,
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
        return sorted_users[:limit]`,
  java: `// Java example - Start typing to replace this code

import java.util.*;
import java.util.stream.Collectors;

public class UserService {
    private List<User> users = new ArrayList<>();
    
    public void addUser(User user) {
        users.add(user);
        System.out.println("User " + user.getName() + " added successfully");
    }
    
    public Optional<User> findUserById(int id) {
        return users.stream()
            .filter(user -> user.getId() == id)
            .findFirst();
    }
    
    public List<User> getActiveUsers() {
        return users.stream()
            .filter(User::isActive)
            .collect(Collectors.toList());
    }
}

class User {
    private int id;
    private String name;
    private String email;
    private boolean isActive;
    
    public int getId() { return id; }
    public String getName() { return name; }
    public boolean isActive() { return isActive; }
}`,
  go: `// Go example - Start typing to replace this code

package main

import (
    "fmt"
    "sort"
)

type User struct {
    ID       int
    Name     string
    Email    string
    Score    int
    IsActive bool
}

type UserService struct {
    users []User
}

func (s *UserService) AddUser(user User) {
    s.users = append(s.users, user)
    fmt.Printf("User %s added successfully\\n", user.Name)
}

func (s *UserService) FindUserByID(id int) (*User, error) {
    for _, user := range s.users {
        if user.ID == id {
            return &user, nil
        }
    }
    return nil, fmt.Errorf("user not found")
}

func (s *UserService) GetTopUsers(limit int) []User {
    sort.Slice(s.users, func(i, j int) bool {
        return s.users[i].Score > s.users[j].Score
    })
    
    if limit > len(s.users) {
        limit = len(s.users)
    }
    return s.users[:limit]
}`,
  rust: `// Rust example - Start typing to replace this code

use std::collections::HashMap;

#[derive(Debug, Clone)]
struct User {
    id: u32,
    name: String,
    email: String,
    score: i32,
    is_active: bool,
}

struct UserService {
    users: Vec<User>,
}

impl UserService {
    fn new() -> Self {
        UserService { users: Vec::new() }
    }
    
    fn add_user(&mut self, user: User) {
        println!("User {} added successfully", user.name);
        self.users.push(user);
    }
    
    fn find_user_by_id(&self, id: u32) -> Option<&User> {
        self.users.iter().find(|user| user.id == id)
    }
    
    fn get_active_users(&self) -> Vec<&User> {
        self.users.iter()
            .filter(|user| user.is_active)
            .collect()
    }
    
    fn get_top_users(&self, limit: usize) -> Vec<&User> {
        let mut sorted_users: Vec<&User> = self.users.iter().collect();
        sorted_users.sort_by(|a, b| b.score.cmp(&a.score));
        sorted_users.into_iter().take(limit).collect()
    }
}`,
  cpp: `// C++ example - Start typing to replace this code

#include <iostream>
#include <vector>
#include <algorithm>
#include <optional>

class User {
private:
    int id;
    std::string name;
    std::string email;
    int score;
    bool isActive;
    
public:
    User(int id, std::string name, std::string email) 
        : id(id), name(name), email(email), score(0), isActive(true) {}
    
    int getId() const { return id; }
    std::string getName() const { return name; }
    int getScore() const { return score; }
    bool getIsActive() const { return isActive; }
    void setScore(int s) { score = s; }
};

class UserService {
private:
    std::vector<User> users;
    
public:
    void addUser(const User& user) {
        users.push_back(user);
        std::cout << "User " << user.getName() << " added successfully\\n";
    }
    
    std::optional<User> findUserById(int id) {
        auto it = std::find_if(users.begin(), users.end(),
            [id](const User& user) { return user.getId() == id; });
        
        if (it != users.end()) {
            return *it;
        }
        return std::nullopt;
    }
    
    std::vector<User> getActiveUsers() {
        std::vector<User> activeUsers;
        std::copy_if(users.begin(), users.end(), std::back_inserter(activeUsers),
            [](const User& user) { return user.getIsActive(); });
        return activeUsers;
    }
};`,
  csharp: `// C# example - Start typing to replace this code

using System;
using System.Collections.Generic;
using System.Linq;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public int Score { get; set; }
    public bool IsActive { get; set; }
}

public class UserService
{
    private List<User> users = new List<User>();
    
    public void AddUser(User user)
    {
        users.Add(user);
        Console.WriteLine($"User {user.Name} added successfully");
    }
    
    public User FindUserById(int id)
    {
        return users.FirstOrDefault(user => user.Id == id);
    }
    
    public List<User> GetActiveUsers()
    {
        return users.Where(user => user.IsActive).ToList();
    }
    
    public List<User> GetTopUsers(int limit = 10)
    {
        return users.OrderByDescending(user => user.Score)
                   .Take(limit)
                   .ToList();
    }
    
    public double CalculateAverageScore()
    {
        return users.Any() ? users.Average(user => user.Score) : 0;
    }
}`,
  php: `<?php
// PHP example - Start typing to replace this code

class User {
    private $id;
    private $name;
    private $email;
    private $score;
    private $isActive;
    
    public function __construct($id, $name, $email) {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
        $this->score = 0;
        $this->isActive = true;
    }
    
    public function getId() { return $this->id; }
    public function getName() { return $this->name; }
    public function getScore() { return $this->score; }
    public function isActive() { return $this->isActive; }
    public function setScore($score) { $this->score = $score; }
}

class UserService {
    private $users = [];
    
    public function addUser(User $user) {
        $this->users[] = $user;
        echo "User {$user->getName()} added successfully\\n";
    }
    
    public function findUserById($id) {
        foreach ($this->users as $user) {
            if ($user->getId() === $id) {
                return $user;
            }
        }
        return null;
    }
    
    public function getActiveUsers() {
        return array_filter($this->users, function($user) {
            return $user->isActive();
        });
    }
    
    public function getTopUsers($limit = 10) {
        usort($this->users, function($a, $b) {
            return $b->getScore() - $a->getScore();
        });
        return array_slice($this->users, 0, $limit);
    }
}`,
  ruby: `# Ruby example - Start typing to replace this code

class User
  attr_accessor :id, :name, :email, :score, :is_active
  
  def initialize(id, name, email)
    @id = id
    @name = name
    @email = email
    @score = 0
    @is_active = true
  end
end

class UserService
  def initialize
    @users = []
  end
  
  def add_user(user)
    @users << user
    puts "User #{user.name} added successfully"
  end
  
  def find_user_by_id(id)
    @users.find { |user| user.id == id }
  end
  
  def get_active_users
    @users.select { |user| user.is_active }
  end
  
  def get_top_users(limit = 10)
    @users.sort_by { |user| -user.score }.take(limit)
  end
  
  def calculate_average_score
    return 0 if @users.empty?
    @users.sum(&:score) / @users.size.to_f
  end
end`,
};

export function getExampleCode(language: string): string {
  return EXAMPLE_CODES[language] || EXAMPLE_CODES.javascript || DEFAULT_CODE;
}