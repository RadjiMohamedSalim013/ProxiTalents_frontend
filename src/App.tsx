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

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import NotFoundPage from './pages/NotFoundPage';

import PrivateRoute from './components/PrivateRoute';

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/profil"
        element={
          <PrivateRoute>
            <Profil />
          </PrivateRoute>
        }
      />
      <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/changer-mot-de-passe" element={<ChangePassword />} />
      <Route path="/" element={<AccueilPage />} />
      <Route path="/a-propos" element={<AproposPage />} />
      <Route
        path="/creation"
        element={
          <PrivateRoute>
            <PageCreationPrestataire />
          </PrivateRoute>
        }
      />
      <Route
        path="/prestataires"
        element={
          <PrivateRoute>
            <Prestataires />
          </PrivateRoute>
        }
      />
      <Route
        path="/prestataire/:id"
        element={
          <PrivateRoute>
            <PageProfilPrestataire />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard-prestataire"
        element={
          <PrivateRoute>
            <PageDashboardPrestataire />
          </PrivateRoute>
        }
      />
      <Route
        path="/prestataire/modification/:id"
        element={
          <PrivateRoute>
            <PageModificationPrestataire />
          </PrivateRoute>
        }
      />
      <Route
        path="/prestataire/ajout-service/:id"
        element={
          <PrivateRoute>
            <FormulaireService />
          </PrivateRoute>
        }
      />
      <Route
        path="/creation-entreprise"
        element={
          <PrivateRoute>
            <PageCreationEntreprise />
          </PrivateRoute>
        }
      />
      <Route
        path="/modification-entreprise/:id"
        element={
          <PrivateRoute>
            <PageModificationEntreprise />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard-entreprise"
        element={
          <PrivateRoute>
            <PageDashboardEntreprise />
          </PrivateRoute>
        }
      />
      <Route
        path="/entreprises"
        element={
          <PrivateRoute>
            <Entreprises />
          </PrivateRoute>
        }
      />
      <Route
        path="/gestion-offres"
        element={
          <PrivateRoute>
            <PageGestionOffres />
          </PrivateRoute>
        }
      />
      <Route
        path="/creation-offre"
        element={
          <PrivateRoute>
            <PageCreationOffre />
          </PrivateRoute>
        }
      />
      <Route path="/offre/:id" element={<PageDetailOffre />} />
      <Route path="/offres" element={<Offres />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/articles/:id" element={<ArticleDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
