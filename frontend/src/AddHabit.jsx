import { useState } from "react" 
function AddHabit({onAdd}){
    const [input, setInput] = useState("")
    function handleSubmit(){
        onAdd(input)
        setInput("")
    }
    return(
        <div>
            <input className= "habit-input" value={input} onChange = {(e) => setInput(e.target.value)} placeholder="Add a Habit..."/>
            <button className="add-btn" onClick={handleSubmit}>Add</button>
        </div>
    )
}

export default AddHabit