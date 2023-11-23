import './App.css';
import Todolist from './components/Todolist';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';



function App() {
const [value, setValue] = useState('one');

const handleChange = (event, value) => {
  setValue(value);
}

return (
  <div className="App">
    <AppBar position='static'>
      <Toolbar>
        <Typography variant="h6">
          My Todos
        </Typography>
      </Toolbar>
    </AppBar>
    <Tabs value={value} onChange={handleChange}>
      <Tab value="one" label="HOME" />
      <Tab value="two" label="TODOS" />
    </Tabs>
    {value === 'one' && <div><h2>Welcome to My Todos list!!!</h2></div>}
    {value === 'two' && <div><Todolist /></div>}
      
  </div>
);
}

export default App;
