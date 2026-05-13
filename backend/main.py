from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from supabase import create_client
import os
from jose import JWTError, jwt
import bcrypt
from datetime import datetime, timedelta, timezone
from fastapi.security import OAuth2PasswordBearer

load_dotenv()

supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
TOKEN_EXPIRE_MINUTES = 1440  #24 hours

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"]
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def current_user(token: str = Depends(oauth2_scheme)):
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = decoded_token.get("sub")
        if not user_id:
            raise HTTPException(status_code = 401, detail = "Invalid Token")
        return user_id
    except JWTError:
        raise HTTPException(status_code = 401, detail = "Invalid Token")

@app.get("/habits")
def read_root(user_id: str = Depends(current_user)):
    return supabase.table("habits").select("*").eq("user_id", user_id).execute().data

class HabitCreate(BaseModel):
    name: str

class Completions(BaseModel):
    habit_id: str
    date: str

class UserAuth(BaseModel):
    email: str
    password: str 

@app.post("/habits")
def create_root(habit: HabitCreate, user_id: str = Depends(current_user)):
    return supabase.table("habits").insert({"name": habit.name, "user_id": user_id}).execute().data

@app.put("/habits/{habit_id}")
def update_habit(habit_id: str, habit: HabitCreate, user_id: str = Depends(current_user)):
    return supabase.table("habits").update({"name": habit.name}).eq("id", habit_id).execute().data

@app.delete("/habits/{habit_id}")
def delete_habit(habit_id: str, user_id: str = Depends(current_user)):
    return supabase.table("habits").delete().eq("id", habit_id).eq("user_id", user_id).execute().data

@app.get("/completions/{habit_id}")
def completed_lst(habit_id: str, user_id: str = Depends(current_user)):
    return supabase.table("completions").select("*").eq("habit_id", habit_id).eq("user_id", user_id).execute().data

@app.post("/completions")
def completed(habit: Completions, user_id: str = Depends(current_user)):
    return supabase.table("completions").insert({"habit_id": habit.habit_id, "user_id": user_id, "completed_date": habit.date}).execute().data

@app.post("/auth/signup")
def signup(user_auth: UserAuth):
    hashed = bcrypt.hashpw(user_auth.password.encode(), bcrypt.gensalt()).decode()
    return supabase.table("users").insert({"email": user_auth.email, "password": hashed}).execute().data

@app.post("/auth/login")
def login(user_auth: UserAuth):
    stored_user = supabase.table("users").select("*").eq("email", user_auth.email).execute().data
    if stored_user:
        if bcrypt.checkpw(user_auth.password.encode(), stored_user[0]["password"].encode()):
            payload = {
                "sub": stored_user[0]["id"], 
                "exp": datetime.now(timezone.utc) + timedelta(minutes=TOKEN_EXPIRE_MINUTES)
            }
            token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
        else:
            raise HTTPException(status_code = 401, detail = "Invalid Credentials")
    else:
        raise HTTPException(status_code = 401, detail = "User NOT FOUND")
    
    return token