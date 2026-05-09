import { useState } from "react" 
function AddHabit({onAdd}){
    const [input, setInput] = useState("")
    function handleSubmit(){
        onAdd(input)
        setInput("")
    }
    return(
        <div>
            <h1>Add Habit Works</h1>
            <input value={input} onChange = {(e) => setInput(e.target.value)} placeholder="Add a Habit..."/>
            <button onClick={handleSubmit}>Add</button>
        </div>
    )
}

export default AddHabit