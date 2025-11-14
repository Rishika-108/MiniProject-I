# backend/router/auth.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext
from datetime import timedelta
from utils.jwt_handler import create_access_token
from db import db # import db from db.py

router = APIRouter(prefix="/auth", tags=["Auth"])

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Pydantic models
class SignUpRequest(BaseModel):
    email: str 
    password: str
    username: str

class LoginRequest(BaseModel):
    email: str
    password: str

# Signup route
@router.post("/signup")
async def signup(req: SignUpRequest):
    user = await db.users.find_one({"email": req.email})
    if user:
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed_password = pwd_context.hash(req.password)
    await db.users.insert_one({
        "email": req.email,
        "password_hash": hashed_password,
        "username": req.username
    })
    return {"message": "Account created successfully"}

# Login route
@router.post("/login")
async def login(req: LoginRequest):
    user = await db.users.find_one({"email": req.email})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Verify password
    if not pwd_context.verify(req.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    access_token_expires = timedelta(minutes=1440)  # 1 day
    token = create_access_token(
        data={"sub": user["email"]},
        expires_delta=access_token_expires
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "username": user["username"]
    }
