import { Link } from "react-router-dom"
import { useAuth } from "./security/AuthContext"
// import { useContext } from "react" //no longer required after creating hook in AuthContext.js

export default function HeaderComponent() {

    // const authContext = useContext(AuthContext); // no need to use this after creating hook in AuthContext.js
    const authContext = useAuth();

    console.log(authContext.number)

    return (
        <>
            <header className="border-bottom border-light border-5 mb-5 p-2">
                <div className="container">
                    <div className="row">
                        <nav className="navbar navbar-expand-lg">
                            <Link className="navbar-brand ms-2 fs-2 fw-bold text-black" to="/">MyToDo</Link>
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav">
                                    <li className="nav-item" ><Link className="nav-link" to="/welcome/sachin">Home</Link></li>
                                    <li className="nav-item" ><Link className="nav-link" to="/todos">ToDos</Link></li>
                                </ul>
                            </div>
                            <ul className="navbar-nav">
                                <li className="nav-item" ><Link className="nav-link" to="/login">Login</Link></li>
                                <li className="nav-item" ><Link className="nav-link" to="/logout">Logout</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div >
            </header >
        </>
    )
}