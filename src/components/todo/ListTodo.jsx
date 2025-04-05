import { useEffect, useState } from "react";
import { deleteToDoService, getToDosForUserService } from "./services/ToDoService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export default function ListToDosComponent() {

    // const todos = [
    //     { id: 1, description: 'Learn AWS', done: false, targetDate: getDate() },
    //     { id: 2, description: 'Learn Python', done: true, targetDate: getDate() },
    //     { id: 3, description: 'Learn Java', done: false, targetDate: getDate() },
    //     { id: 4, description: 'Learn Kubernetes', done: false, targetDate: getDate() }
    // ]

    const authContext = useAuth();
    const username = authContext.username;

    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState();

    const navigate = useNavigate();

    useEffect(() => refreshTodos(), [username]);


    function refreshTodos() {
        getToDosForUserService(username)
            .then((response) => setTodos(response.data))
            .catch((err) => console.log(err));
    }

    function openToDo(id) {
        navigate(`/view/${id}`, { state: { readonly: true } });
    }

    function deleteTodo(id) {
        deleteToDoService(id)
            .then((response) => {
                setMessage(`Deleted Todo item: ${id}`);
                refreshTodos();
            })
            .catch((err) => console.log(err));
    }

    function updateTodo(id) {
        // updateToDoService(item.id, item)
        //     .then((response) => {
        //         setMessage(`Updated Todo item: ${item.id}`);
        //         refreshTodos();
        //     })
        //     .catch((err) => console.log(err));

        navigate(`/view/${id}`, { state: { readonly: false } });
    }

    function addNewTodo(id) {
        navigate('/view/-1');
    }


    return (
        <>
            <div className="container">
                <h4>Things you want to ToDo!</h4>
                {message && <div className="alert alert-warning">{message}</div>}
                <div>
                    <button className="btn btn-success" onClick={() => addNewTodo()} >
                        Add ToDo
                    </button>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Is Done?</th>
                                <th>Target Date</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map((ele, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{ele.title}</td>
                                        <td>{ele.completed ? 'yes' : 'no'}</td>
                                        <td>{ele.dueDate}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => openToDo(ele.id)} >
                                                View
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => deleteTodo(ele.id)} >
                                                Delete
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => updateTodo(ele.id)} >
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div >
        </>
    )
}