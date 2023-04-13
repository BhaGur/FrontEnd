import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Todotable from './components/Todotable';
import Todolist from './components/Todolist';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals';
  
test('renders todotable', () => {
const row = [
{description: 'Go to coffee', priority: 'high', date: '24.01.2021'}
];
render(<Todotable todos={row} />);
const desc = screen.getByText(/go to coffee/i);
const priority = screen.getByText(/high/i);
const date = screen.getByText(/24.01.2021/i);
expect(desc).toBeInTheDocument();
expect(priority).toBeInTheDocument();
expect(date).toBeInTheDocument();
});

