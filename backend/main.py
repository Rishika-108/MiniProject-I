# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(title="Swastik Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)



# Ensure routes package exists and has __init__.py
from router import auth, chat, system

app.include_router(auth.router)
app.include_router(chat.router)
app.include_router(system.router)

@app.get("/")
def root():
    return {"message": "Swastik Backend is running"}
