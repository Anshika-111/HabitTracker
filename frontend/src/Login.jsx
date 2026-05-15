import { useState } from "react" 
import { login } from './api'

function Login({onLogin}){
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    async function handleLogin(){
        const response = await login(email, password)
        onLogin(response.data)
    }

    return(
        <div>
            <input value={email} onChange = {(e) => setEmail(e.target.value)} placeholder="Add your email..."/>
            <input value={password} onChange = {(e) => setPassword(e.target.value)} placeholder="Add your password..."/>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default login