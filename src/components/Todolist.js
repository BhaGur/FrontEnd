import React, { useState, useRef } from'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Todolist() {
    const [list, setList] = React.useState({description:'', priority:'' , date: ''});
    const [todos, setTodos] = React.useState([]);
    const gridRef = useRef();

    const [columnDefs] = useState([
        { field: 'description', sortable: true, filter: true, floatingFilter: true},
        { field: 'priority', sortable: true, filter: true, cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}, floatingFilter: true},
        { field: 'date', sortable: true, filter: true, floatingFilter: true}
    ]);

    const addTodo = () => {
        setTodos([...todos, list]); //To have the latest input at first have ...todos after the description
        setList({ description: '', priority: '', date: ''});
    }

    const deleteTask = () => { 
        if (gridRef.current.getSelectedNodes().length > 0)
        setTodos(todos.filter((todo, index) => index != gridRef.current.getSelectedNodes()[0].id));
        else
        alert('Please select a row');
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
                placeholder='Priority'
                value={list.priority}
                onChange={e => setList({...list, priority: e.target.value})}
            />

            <input
                type = 'date'
                placeholder='Date'
                value={list.date}
                onChange={e => setList({...list, date: e.target.value})}
            />
            <button onClick={addTodo}>Add</button>
            <button onClick={deleteTask}>Delete</button>

            <div className='ag-theme-material' style={{height: 600, width: 600, margin: 'auto' }}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={ params => gridRef.current = params.api}
                    rowSelection='single'
                    animateRows={true}
                    rowData={todos}
                    columnDefs={columnDefs}
                />
            </div>
         
        </div>
    )
}

