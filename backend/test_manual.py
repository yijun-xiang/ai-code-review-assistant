import asyncio
import aiohttp
import json

async def test_api():
    base_url = "http://localhost:8000"
    
    async with aiohttp.ClientSession() as session:
        print("Testing health check...")
        async with session.get(f"{base_url}/health") as resp:
            print(f"Health check: {resp.status}")
            print(await resp.json())
        
        print("\nTesting code review...")
        test_code = '''
def calculate_sum(numbers):
    total = 0
    for num in numbers:
        total += num
    return total

# Test the function
result = calculate_sum([1, 2, 3, 4, 5])
print(f"Sum: {result}")
'''
        
        payload = {
            "code": test_code,
            "language": "python",
            "context": "This is a simple function to calculate sum"
        }
        
        async with session.post(
            f"{base_url}/api/v1/review",
            json=payload
        ) as resp:
            print(f"Code review status: {resp.status}")
            if resp.status == 200:
                result = await resp.json()
                print(json.dumps(result, indent=2))
            else:
                print(await resp.text())

if __name__ == "__main__":
    asyncio.run(test_api())