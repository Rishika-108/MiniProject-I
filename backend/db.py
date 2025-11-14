from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
import asyncio

# Load environment variables
load_dotenv()

# Get MongoDB connection info
MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME", "jarvis")

if not MONGODB_URI:
    raise ValueError("❌ MONGODB_URI is not set in the .env file")

# Create MongoDB async client
client = AsyncIOMotorClient(MONGODB_URI, tls=True, tlsAllowInvalidCertificates=True)
db = client[DB_NAME]

# Test connection
async def test_connection():
    try:
        await client.admin.command("ping")
        print(f"✅ Successfully connected to MongoDB Atlas database: '{DB_NAME}'")
    except Exception as e:
        print("❌ MongoDB connection failed:", e)

if __name__ == "__main__":
    asyncio.run(test_connection())
