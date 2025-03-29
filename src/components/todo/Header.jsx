import { Link } from "react-router-dom"
import { useAuth } from "./security/AuthContext"
// import { useContext } from "react" //no longer required after creating hook in AuthContext.js

export default function HeaderComponent() {

    // const authContext = useContext(AuthContext); // no need to use this after creating hook in AuthContext.js
    const authContext = useAuth();

    function logout() {
        authContext.logout();
    }

    return (
        <>
            <header className="border-bottom border-light border-5 mb-5 p-2">
                <div className="container">
                    <div className="row">
                        <nav className="navbar navbar-expand-lg">
                            {authContext.isAuthenticated && <Link className="navbar-brand ms-2 fs-2 fw-bold text-black" to="/welcome/sachin">MyToDo</Link>}
                            {!authContext.isAuthenticated && <Link className="navbar-brand ms-2 fs-2 fw-bold text-black" to="/">MyToDo</Link>}
                            <div className="collapse navbar-collapse" >
                                {authContext.isAuthenticated && <ul className="navbar-nav">
                                    <li className="nav-item" ><Link className="nav-link" to="/welcome/sachin">Home</Link></li>
                                    <li className="nav-item" ><Link className="nav-link" to="/todos">ToDos</Link></li>
                                </ul>}
                            </div>
                            <ul className="navbar-nav">
                                {!authContext.isAuthenticated && <li className="nav-item" ><Link className="nav-link" to="/login">Login</Link></li>}
                                {authContext.isAuthenticated && <li className="nav-item" ><Link className="nav-link" to="/logout" onClick={logout} >Logout</Link></li>}
                            </ul>
                        </nav>
                    </div>
                </div >
            </header >
        </>
    )
}