function HabitList({habits, toggle}){
    function streakCalc(dates){
        let streak = 0
        let currentDate = new Date()
        if (dates.length === 0){
            return 0
        }
        const sorted = [...dates].sort((a,b) => new Date(b) - new Date(a))
        while(sorted.includes(currentDate.toDateString())){
            streak += 1
            currentDate = new Date(currentDate - 86400000)
        }
        return streak
    }
    return(
        <div>
            <h1>Habit List Works</h1>
            <ul>
                {habits.map(habit => 
                <li key={habit.id}>{habit.name} 
                <button onClick={() => toggle(habit.id)}>Done</button> 
                🔥 {streakCalc(habit.completedDates)}
                </li>
                )}
            </ul>
        </div>
    )
}

export default HabitList