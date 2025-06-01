import { BrowserRouter, Routes, Route,  } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import Profil from './pages/Profil';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { ChangePassword } from './pages/ChangePassword';
import AccueilPage from './pages/home';
import AproposPage from './pages/apropos';



const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />
<Route path="/changer-mot-de-passe" element={<ChangePassword />} />
<Route path="/home" element={<AccueilPage />} />
<Route path="/a-propos" element={<AproposPage />} />










    </Routes>
  </BrowserRouter>
);


export default App;
