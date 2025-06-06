import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import Profil from './pages/Profil';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { ChangePassword } from './pages/ChangePassword';
import AccueilPage from './pages/home';
import AproposPage from './pages/apropos';
import PageCreationPrestataire from './pages/prestataire/PageCreationPrestataire';
import Prestataires from './pages/prestataire/Prestataires';
import PageProfilPrestataire from './pages/prestataire/PageProfilPrestataire';
import PageDashboardPrestataire from './pages/prestataire/PageDashboardPrestataire';
import PageModificationPrestataire from './pages/prestataire/PageModificationPrestataire';
import FormulaireService from './components/prestataire/FormulaireService';

import PageCreationEntreprise from './pages/entreprise/PageCreationEntreprise';
import PageModificationEntreprise from './pages/entreprise/PageModificationEntreprise';
import PageDashboardEntreprise from './pages/entreprise/PageDashboardEntreprise';
import Entreprises from './pages/entreprises/Entreprises';
import PageGestionOffres from './pages/entreprise/PageGestionOffres';
import PageCreationOffre from './pages/entreprise/PageCreationOffre';
import PageDetailOffre from './pages/entreprise/PageDetailOffre';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import Offres from './pages/entreprise/Offres';

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
      <Route path="/creation" element={<PageCreationPrestataire />} />
      <Route path="/prestataires" element={<Prestataires />} />
      <Route path="/prestataire/:id" element={<PageProfilPrestataire />} />
      <Route path="/dashboard-prestataire" element={<PageDashboardPrestataire />} />
      <Route path="/prestataire/modification/:id" element={<PageModificationPrestataire />} />
      <Route path="/prestataire/ajout-service/:id" element={<FormulaireService />} />
      <Route path="/creation-entreprise" element={<PageCreationEntreprise />} />
      <Route path="/modification-entreprise/:id" element={<PageModificationEntreprise />} />
      <Route path="/dashboard-entreprise" element={<PageDashboardEntreprise />} />
      <Route path="/entreprises" element={<Entreprises />} />
      <Route path="/gestion-offres" element={<PageGestionOffres />} />
      <Route path="/creation-offre" element={<PageCreationOffre />} />
      <Route path="/offre/:id" element={<PageDetailOffre />} />
      <Route path="/offres" element={<Offres />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/articles/:id" element={<ArticleDetailPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
