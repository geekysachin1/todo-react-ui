import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addToDoService, getToDosByIdService, updateToDoService } from "./services/ToDoService";
import { useAuth } from "./security/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment";


export default function ViewToDo() {

    //const location = useLocation();
    const navigate = useNavigate();

    //const readonly = location.state.readonly;

    const authContext = useAuth();
    const username = authContext.username;

    const dummyTodo = { id: 1, title: '', dueDate: '', completed: '' }
    const { id } = useParams();
    const [todo, setTodo] = useState(dummyTodo);

    const openToDo = () => {
        getToDosByIdService(username, id)
            .then((response) => {
                setTodo(response.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (id != -1) {
            openToDo();
        }
    }, [id, username]);

    function updateTodo(item) {
        updateToDoService(id, item)
            .then((response) => {
                navigate('/todos')
            })
            .catch((err) => console.log(err));
    }

    function addToDo(item) {
        item.username = username;
        item.completed = false;
        console.log(item);
        addToDoService(item)
            .then((response) => {
                navigate('/todos')
            })
            .catch((err) => console.log(err));
    }

    function onSubmit(values) {
        console.log(values)
        if (values.id === 1 && values.completed === '') {
            addToDo(values);
        } else {
            updateTodo(values);
        }
    }

    function validateForm(values) {
        const errors = {};

        if (!values.title) {
            errors.title = "Title is required!"
        }

        if (values.title.length < 5) {
            errors.title = "Title must be of min 5 chars!"
        }

        if (values.dueDate < moment()) {
            errors.dueDate = "Due date cant be in past!"
        }
        return errors;

    }

    return (
        <>
            {/* <div className="container">
                <form>
                    <fieldset disabled={readonly}>
                        <div className="form-row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="ID" defaultValue={todo.id} value={todo.id} />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Title" value={todo.title} />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Is Done?" value={todo.completed} />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Due Date" value={todo.dueDate} />
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div> */}

            <div className="container">
                <h3>Enter Todo Details</h3>
                <Formik initialValues={todo}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validateForm}
                    validateOnBlur={false}
                    validateOnChange={false}
                >
                    {
                        (props) => (
                            <div>
                                <Form >
                                    <ErrorMessage name="title" component="div" className="alert alert-warning" />
                                    <ErrorMessage name="dueDate" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Title</label>
                                        <Field className="form-control" name="title" type="text" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Due Date</label>
                                        <Field className="form-control" name="dueDate" type="date" />
                                    </fieldset>
                                    <div>
                                        <button type="submit" className="btn btn-primary m-4">Save</button>
                                    </div>
                                </Form>
                            </div>
                        )
                    }
                </Formik>
            </div>
        </>
    )
}