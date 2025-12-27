# backend/routes/chat.py
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from utils.jwt_handler import get_current_user
from db import db
from datetime import datetime
from dotenv import load_dotenv
import os
import httpx

load_dotenv()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

router = APIRouter(prefix="/chat", tags=["Chat"])

class ChatRequest(BaseModel):
    message: str

@router.post("/")
async def send_chat(req: ChatRequest, user=Depends(get_current_user)):
    if not OPENROUTER_API_KEY:
        raise HTTPException(status_code=500, detail="OpenRouter API key not set")

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": "gpt-4o-mini",  # change to the model name you want (openrouter label)
        "messages": [
            {"role": "system", "content": "You are Swastik, a helpful student assistant."},
            {"role": "user", "content": req.message},
        ],
        "temperature": 0.6,
        "max_tokens": 600
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)
            resp.raise_for_status()
            data = resp.json()
    except httpx.HTTPStatusError as he:
        raise HTTPException(status_code=500, detail=f"OpenRouter error: {he.response.text}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # extract reply robustly
    reply = None
    choices = data.get("choices") or data.get("outputs") or []
    if choices and isinstance(choices, list):
        first = choices[0]
        if isinstance(first, dict):
            if "message" in first and isinstance(first["message"], dict):
                reply = first["message"].get("content")
            elif "text" in first:
                reply = first.get("text")
            elif "content" in first:
                reply = first.get("content")
    if not reply:
        reply = str(data)

    await db.history.insert_one({
        "username": user["username"],
        "message": req.message,
        "reply": reply,
        "timestamp": datetime.utcnow()
    })

    return {"reply": reply}
