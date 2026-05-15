import { useState } from "react" 
import { signup } from './api'

function Signup({onSignup}){
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    async function handleSignup(){
        const response = await signup(email, password)
        onSignup(response.data)
    }

    return(
        <div>
            <input value={email} onChange = {(e) => setEmail(e.target.value)} placeholder="Add your email..."/>
            <input value={password} onChange = {(e) => setPassword(e.target.value)} placeholder="Add your password..."/>
            <button onClick={handleSignup}>SignUp</button>
        </div>
    )
}

export default Signup