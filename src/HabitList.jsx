function HabitList({habits, toggle}){
    return(
        <div>
            <h1>Habit List Works</h1>
            <ul>
                {habits.map(habit => 
                <li key={habit.id}>{habit.name} <button onClick={() => toggle(habit.id)}>Done</button> </li>
                )}
            </ul>
        </div>
    )
}

export default HabitList