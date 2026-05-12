import { useState, useEffect } from "react"
import AddHabit from "./AddHabit"
import HabitList from "./HabitList"
function App(){
  const [habits, setHabits] = useState([])

  function addHabit(name){
    setHabits([...habits, {id: Date.now(), name, completedDates: []}])
  }

  function toggleHabit(id){
    const todayDate = new Date().toDateString()
    const match = habits.find(habit => habit.id === id)
    let newCompletedDate
    if(match.completedDates.includes(todayDate)){
      newCompletedDate = match.completedDates.filter(date => date !== todayDate)
    }
    else{
      newCompletedDate = [...match.completedDates, todayDate]
    }
    setHabits(habits.map(habit =>
      habit.id === id? {...habit, completedDates: newCompletedDate} : habit
    ))
  }
  
  function deleteHabit(id){
    let newHabits 
    newHabits = habits.filter(habit => habit.id !== id)
    setHabits(newHabits)
  }
  useEffect(() => {
    if(habits.length > 0){
      localStorage.setItem("habits", JSON.stringify(habits))
    }
  }, [habits])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("habits"))
    if(saved){
      setHabits(saved)
    }
  }, [])
  return(
    <div className="container">
      <h1>Habit Tracker</h1>
      <AddHabit onAdd = {addHabit}/>
      <HabitList habits = {habits} toggle = {toggleHabit} deleteHabit = {deleteHabit}/>
    </div>
  )
}

export default App