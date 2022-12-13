import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Capture from './pages/Capture';
import Analyze from './pages/Analyze';
import { Stack } from '@mui/system';
import { Typography } from '@mui/material';

function App() {
  return (
    <Routes>
      <Route path='/capture' element={<Capture />} />
      <Route path='/analyze' element={<Analyze />} />
      <Route path='*' element={
        <Stack alignItems={'center'}>
          <Typography variant='h2'> 404 </Typography>
        </Stack>
      } />

    </Routes>
  );
}

export default App;
