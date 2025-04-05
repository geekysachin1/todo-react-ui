import { Component } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import WelcomeComponent from "./Welcome";
import LoginComponent from "./Login";
import LogOutComponent from "./Logout";
import HeaderComponent from "./Header";
import FooterComponent from "./Footer";
import ErrorComponent from "./Error";
import ListToDosComponent from "./ListTodo";
import AuthProvider from "./security/AuthContext";
import { useAuth } from "./security/AuthContext";
import './TodoApp.css'
import ViewToDo from "./ViewToDo";

function AuthenticatedRoute({ children }) {
    const authContext = useAuth();

    if (authContext.isAuthenticated) {
        return children;
    }

    return <Navigate to="/" />

}

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

                                <Route path='/welcome/:username' element={
                                    <AuthenticatedRoute>
                                        <WelcomeComponent />
                                    </AuthenticatedRoute>
                                } />

                                <Route path='/todos' element={
                                    <AuthenticatedRoute><ListToDosComponent />
                                    </AuthenticatedRoute>
                                }
                                />
                                <Route path='/logout' element={
                                    <AuthenticatedRoute><LogOutComponent />
                                    </AuthenticatedRoute>
                                }
                                />
                                <Route path='/view/:id' element={
                                    <AuthenticatedRoute><ViewToDo />
                                    </AuthenticatedRoute>
                                }
                                />
                                <Route path='*' element={<ErrorComponent />} />
                            </Routes>
                            <FooterComponent />
                        </BrowserRouter>
                    </AuthProvider>


                    {/* <div><LoginComponent /></div>
                    <div><WelcomeComponent /></div> */}
                </div >
            </>
        )
    }
}







