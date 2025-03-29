import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './TodoApp.css'

export default function LoginComponent() {

    const [userName, setUserName] = useState('admin');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLogin] = useState("");
    const navigate = useNavigate();

    function handleUserNameChange(event) {
        setUserName(event.target.value);
    }

    function handlePasswordChange(event) {
        // console.log(event.target.value);
        setPassword(event.target.value);
    }

    function handleLoginClick(e) {
        if (userName === 'admin' && password === "admin") {
            setLogin("success");
            navigate(`/welcome/${userName}`)
        }
        else {
            setLogin("error")
            //navigate('/')
        }
    }


    return (
        <>
            <div className="Login">
                {loginSuccess === "success" && <div className="successMessage">Authenticated Successfully</div>}
                {loginSuccess === "error" && <div className="errorMessage">Authentication Failed. Please check your credentials</div>}
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