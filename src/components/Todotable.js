import React from 'react';

export default function Todotable({ todos, deleteTodo }) {
return (
    <div>
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