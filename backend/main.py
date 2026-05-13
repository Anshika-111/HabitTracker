from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from supabase import create_client
import os

load_dotenv()

supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/habits")
def read_root():
    return supabase.table("habits").select("*").execute().data

class HabitCreate(BaseModel):
    name: str

@app.post("/habits")
def create_root(habit: HabitCreate):
    return supabase.table("habits").insert({"name": habit.name, "user_id": "temp-user"}).execute().data

@app.put("/habits/{habit_id}")
def update_habit(habit_id: str, habit: HabitCreate):
    return supabase.table("habits").update({"name": habit.name}).eq("id", habit_id).execute().data

@app.delete("/habits/{habit_id}")
def delete_habit(habit_id: str):
    return supabase.table("habits").delete().eq("id", habit_id).execute().data
