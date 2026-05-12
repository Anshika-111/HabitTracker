from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/habits")
def read_root():
    return [
    {"id": 1, "name": "drink water"},
    {"id": 2, "name": "exercise"}
    ]

class HabitCreate(BaseModel):
    name: str

@app.post("/habits")
def create_root(habit: HabitCreate):
    return {"id": 43, "name": habit.name}

@app.put("/habits/{habit_id}")
def update_habit(habit_id: int, habit: HabitCreate):
    return {"id": habit_id, "name": habit.name}

@app.delete("/habits/{habit_id}")
def delete_habit(habit_id: int):
    return {"message": "Habit was deleted!"}

