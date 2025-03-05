import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'


export const LoginPage = ({setIsUserLoggedIn}) => {
    const [email, SetEmail] = useState('')
    const [password, SetPassword] = useState('')
    const [error, SetError] = useState('')


    const OnLoginClicked = async() => {
        // SetError('Login functionality is not implemented yet');
        setIsUserLoggedIn(true);
    }
    const navigate = useNavigate();
    return(
        <div className = "content-container">
            <h1>Login</h1>
            {error && <div className="fail">{error}</div>}
            <input type="text" placeholder="someone@gmail.com" value={email} onChange={e => SetEmail(e.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={e => SetPassword(e.target.value)} />
            <button disabled={!email || !password} onClick={OnLoginClicked}>LetsChat</button>
            <button onClick={() => navigate('/SignUp')}>signUp</button>
            <button onClick={() => navigate('/ForgotPassword')}>forgot your password?</button>
        </div>
    )
}