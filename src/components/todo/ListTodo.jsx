export default function ListToDosComponent() {

    const todos = [
        { id: 1, description: 'Learn AWS', done: false, targetDate: getDate() },
        { id: 2, description: 'Learn Python', done: true, targetDate: getDate() },
        { id: 3, description: 'Learn Java', done: false, targetDate: getDate() },
        { id: 4, description: 'Learn Kubernetes', done: false, targetDate: getDate() }
    ]

    function getDate() {
        const today = new Date();
        let min = 1, max = 5;
        const randomNo = min * Math.random() * (max - min);
        const targetDate = new Date(today.getFullYear() + randomNo, today.getMonth(), today.getDay());
        return targetDate;
    }

    return (
        <>
            <div className="container">
                <h4>Things you want to ToDo!</h4>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Description</td>
                                <td>Is Done?</td>
                                <td>Target Date</td>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map((ele, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{ele.id}</td>
                                        <td>{ele.description}</td>
                                        <td>{ele.done ? 'yes' : 'no'}</td>
                                        <td>{ele.targetDate.toDateString()}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}