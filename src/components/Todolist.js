import React, { useState, useRef } from'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Todolist() {
    const [list, setList] = React.useState({description:'', priority:'' , date: null});
    const [todos, setTodos] = React.useState([]);
    const gridRef = useRef();

    const [columnDefs] = useState([
        { field: 'description', sortable: true, filter: true, floatingFilter: true},
        { field: 'priority', sortable: true, filter: true, cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}, floatingFilter: true},
        { field: 'date', sortable: true, filter: true, floatingFilter: true}
    ]);

    const addTodo = () => {
        setTodos([{...list, date: dayjs(new Date(list.date)).format('DD/MM/YYYY')}, ...todos]); //To have the latest input at first have ...todos after the description
        setList({ description: '', priority: '', date: null});
    }

    const deleteTask = () => { 
        if (gridRef.current.getSelectedNodes().length > 0)
        setTodos(todos.filter((todo, index) => index != gridRef.current.getSelectedNodes()[0].id));
        else
        alert('Please select a row');
    }

    return(
        <div>
            <Stack 
                direction='row' 
                spacing={2} 
                justifyContent="center"
                alignItems="center">

                <TextField
                    label='Description'
                    variant='standard'
                    value={list.description}
                    onChange={e => setList({...list, description: e.target.value})}
                />

                <TextField
                    label='Priority'
                    variant='standard'
                    value={list.priority}
                    onChange={e => setList({...list, priority: e.target.value})}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                       <DatePicker
                        label='Date'
                        value={list.date}
                        onChange={e => setList({...list, date: e})}
                        // onChange = (date) => { const ISOdate = date.toISOString(); }
                        /> 
                    </DemoContainer>
                </LocalizationProvider>

                <Button 
                    variant="contained" 
                    onClick={addTodo}>
                        Add Task
                </Button>
                
                <Button 
                    variant="contained" 
                    color="error" 
                    onClick={deleteTask}>
                        Delete
                </Button>
            </Stack>

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

