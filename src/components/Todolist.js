import React from'react';

export default function Todolist() {
    const [list, setList] = React.useState({description:'' , date: ''});
    const [todos, setTodos] = React.useState([]);

    const addTodo = () => {
        setTodos([...todos, list]); //To have the latest input at first have ...todos after the description
        setList({ description: '', date: ''});
    }

    const deleteTask = (row) => {
        setTodos(todos.filter((todo, index) => index !== row));
    }

    return(
        <div>
            <h1> My todos</h1>
            <input
                placeholder='Description'
                value={list.description}
                onChange={e => setList({...list, description: e.target.value})}
            />
    
            <input
                type = 'date'
                placeholder='Date'
                value={list.date}
                onChange={e => setList({...list, date: e.target.value})}
            />
            <button onClick={addTodo}>Add</button>
            <table>
                <tbody>
                    {
                        todos.map((todo, index) => 
                        <tr key={index}>
                            <td>{todo.description}</td>
                            <td>{todo.date}</td>
                            <td><button onClick={() => deleteTask(index)}>Done</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

