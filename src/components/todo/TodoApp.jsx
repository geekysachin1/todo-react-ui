import { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomeComponent from "./Welcome";
import LoginComponent from "./Login";
import LogOutComponent from "./Logout";
import HeaderComponent from "./Header";
import FooterComponent from "./Footer";
import ErrorComponent from "./Error";
import ListToDosComponent from "./ListTodo";
import AuthProvider from "./security/AuthContext";
import './TodoApp.css'

export default class TodoApp extends Component {

    render() {
        //const [loginSuccess, setLogin] = useState(false);

        return (
            <>
                <div className="TodoApp">
                    <AuthProvider>
                        <BrowserRouter>
                            <HeaderComponent />
                            <Routes>
                                <Route path='/' element={<LoginComponent />} />
                                <Route path='/login' element={<LoginComponent />} />
                                <Route path='/welcome/:username' element={<WelcomeComponent />} />
                                <Route path='/todos' element={<ListToDosComponent />} />
                                <Route path='/logout' element={<LogOutComponent />} />
                                <Route path='*' element={<ErrorComponent />} />
                            </Routes>
                            <FooterComponent />
                        </BrowserRouter>
                    </AuthProvider>


                    {/* <div><LoginComponent /></div>
                    <div><WelcomeComponent /></div> */}
                </div>
            </>
        )
    }
}







