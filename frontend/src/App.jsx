import { useState } from "react"
import AddHabit from "./AddHabit"
import HabitList from "./HabitList"
import Login from "./Login"
import Signup from "./Signup"
import { setAuthToken, getHabits, addHabit, deleteHabit, toggleHabit } from './api'

function App(){
  const [habits, setHabits] = useState([])
  const [token, setToken] = useState(null)

  async function handleAddHabit(name){
    const response = await addHabit(name)
    setHabits([...habits, response.data[0]])
  }

  async function handleToggleHabit(id, date){
    await toggleHabit(id, date)
    const response = await getHabits()
    setHabits(response.data)
  }
  
  async function handleDeleteHabit(id){
    await deleteHabit(id)
    setHabits(habits.filter(habit => habit.id !== id))
  }

  async function handleLogin(token){
    setToken(token)
    setAuthToken(token)
    const response = await getHabits()
    setHabits(response.data)
  }
  
  async function handleSignup(token){
    setToken(token)
    setAuthToken(token)
    const response = await getHabits()
    setHabits(response.data)
  }

  return(
      <div className="container">
        {token ? (
          <>
          <h1>Habit Tracker</h1>
          <AddHabit onAdd = {handleAddHabit}/>
          <HabitList habits = {habits} toggle = {handleToggleHabit} deleteHabit = {handleDeleteHabit}/>
          </>
          ) : (
            <>
            <Login onLogin = {handleLogin}/>
            <Signup onSignup = {handleSignup}/>
            </>
          )
        }
      </div>
  )
}

export default App