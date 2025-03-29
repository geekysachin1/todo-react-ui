import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './TodoApp.css'
import { useAuth } from "./security/AuthContext";

export default function LoginComponent() {

    const [userName, setUserName] = useState('admin');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();
    const authContext = useAuth();

    function handleUserNameChange(event) {
        setUserName(event.target.value);
    }

    function handlePasswordChange(event) {
        // console.log(event.target.value);
        setPassword(event.target.value);
    }

    function handleLoginClick(e) {
        if (authContext.login(userName, password)) {
            navigate(`/welcome/${userName}`)
        }
        else {
            setLoginError(true)
        }
    }


    return (
        <>
            <div className="Login">
                {loginError && <div className="errorMessage">Authentication Failed. Please check your credentials</div>}
                <div className="LoginForm">
                    <div>
                        <label>User Name</label>
                        <input type="text" name="username" value={userName} onChange={handleUserNameChange} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                    </div>
                    <div>
                        <button type="button" name="login" onClick={handleLoginClick}>Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}