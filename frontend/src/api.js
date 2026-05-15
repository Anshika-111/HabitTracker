import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000'
})

export const setAuthToken = (token) => {
    if(token){
        api.defaults.headers.common["Authorization"] = "Bearer ${token}"
    }
    else{
        delete api.defaults.headers.common["Authorization"]
    }
}

export const signup = (email, password) => 
    api.post('/auth/signup', { email, password })

export const login = (email, password) =>
    api.post("/auth/login", { email, password })

export const getHabits = () =>
    api.get("/habits")

export const addHabit = (name) =>
    api.post("/habits", {name})

export const deleteHabit = (id) =>
    api.delete(`/habits/ ${id}`)

export const toggleHabit = (habit_id, date) =>
    api.post("/completions", {habit_id, date})

export const getCompletions = (habit_id) =>
    api.get(`/completions/ ${habit_id}`)
