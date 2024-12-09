import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './Layouts/AppLayout';
import "./index.css";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<AppLayout/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
