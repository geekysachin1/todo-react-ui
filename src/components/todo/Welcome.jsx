import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import './TodoApp.css'

export default function WelcomeComponent() {
    const { username } = useParams();
    return (
        <>
            <div>
                <h3>Welcome {username}!</h3>
            </div>
            <div>
                <Link className="Links" to="/todos">Manage ToDo's</Link>
            </div>
        </>
    )
}

