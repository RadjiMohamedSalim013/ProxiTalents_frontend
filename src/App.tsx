import { BrowserRouter, Routes, Route,  } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import Profil from './pages/Profil';



const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profil" element={<Profil />} />



    </Routes>
  </BrowserRouter>
);


export default App;
