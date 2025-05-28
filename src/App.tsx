import { BrowserRouter, Routes, Route,  } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';




const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

    </Routes>
  </BrowserRouter>
);


export default App;
