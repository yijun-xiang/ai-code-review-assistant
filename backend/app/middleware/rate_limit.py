from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
import time
from collections import defaultdict
from datetime import datetime, timedelta
import asyncio
from ..config import settings

class IPRateLimiter:
    def __init__(self, max_requests: int = 10, window_hours: int = 24):
        self.max_requests = max_requests
        self.window_hours = window_hours
        self.ip_requests = defaultdict(list)
        self.lock = asyncio.Lock()
        
    async def check_rate_limit(self, ip: str) -> tuple[bool, int]:
        async with self.lock:
            current_time = datetime.now()
            window_start = current_time - timedelta(hours=self.window_hours)
            
            self.ip_requests[ip] = [
                req_time for req_time in self.ip_requests[ip] 
                if req_time > window_start
            ]
            
            if len(self.ip_requests[ip]) >= self.max_requests:
                return False, self.max_requests - len(self.ip_requests[ip])
            
            self.ip_requests[ip].append(current_time)
            return True, self.max_requests - len(self.ip_requests[ip])
    
    async def get_remaining_requests(self, ip: str) -> int:
        async with self.lock:
            current_time = datetime.now()
            window_start = current_time - timedelta(hours=self.window_hours)
            
            self.ip_requests[ip] = [
                req_time for req_time in self.ip_requests[ip] 
                if req_time > window_start
            ]
            
            return self.max_requests - len(self.ip_requests[ip])

rate_limiter = IPRateLimiter(
    max_requests=settings.RATE_LIMIT_MAX_REQUESTS, 
    window_hours=settings.RATE_LIMIT_WINDOW_HOURS
)

async def rate_limit_middleware(request: Request, call_next):
    if request.url.path.startswith("/api/v1/review") and request.method == "POST":
        client_ip = request.client.host
        if request.headers.get("X-Forwarded-For"):
            client_ip = request.headers.get("X-Forwarded-For").split(",")[0].strip()
        elif request.headers.get("X-Real-IP"):
            client_ip = request.headers.get("X-Real-IP")
        
        allowed, remaining = await rate_limiter.check_rate_limit(client_ip)
        
        if not allowed:
            return JSONResponse(
                status_code=429,
                content={
                    "detail": f"Rate limit exceeded. Maximum {rate_limiter.max_requests} requests per {rate_limiter.window_hours} hours.",
                    "remaining_requests": 0,
                    "reset_hours": rate_limiter.window_hours
                },
                headers={
                    "X-RateLimit-Limit": str(rate_limiter.max_requests),
                    "X-RateLimit-Remaining": "0",
                    "X-RateLimit-Reset": str(rate_limiter.window_hours)
                }
            )
        
        response = await call_next(request)
        response.headers["X-RateLimit-Limit"] = str(rate_limiter.max_requests)
        response.headers["X-RateLimit-Remaining"] = str(remaining)
        response.headers["X-RateLimit-Reset"] = str(rate_limiter.window_hours)
        return response
    
    return await call_next(request)