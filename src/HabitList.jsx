function HabitList({habits, toggle, deleteHabit}){
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

    function getLast7days(){
        let currentDate = new Date()
        const last7 = []
        while(last7.length < 7){
            last7.push(currentDate.toDateString())
            currentDate = new Date(currentDate - 86400000)
        }
        return last7
    }
    if(habits.length === 0) return <p>No habits yet. Add one above!</p>
    return(
        <div>
            <ul className="habit-list">
                {habits.map(habit => 
                <li className="habit-item" key={habit.id}>{habit.name} 
                <div className="dots-row">
                {getLast7days().map(date => 
                    habit.completedDates.includes(date) ? <span key={date}>●</span> :<span key={date}>○</span>
                )}
                </div>
                <button className="done-btn" onClick={() => toggle(habit.id)}>Done</button> 
                🔥 {streakCalc(habit.completedDates)}
                <button className="delete-btn" onClick={() => deleteHabit(habit.id)}>Delete</button>
                </li>
                )}
            </ul>
        </div>
    )
}

export default HabitList