/**
 * Instance Axios configurée avec une URL de base pour l'API et un intercepteur.
 *
 * @remarques
 * - L'URL de base est définie sur 'http://localhost:3000/api/'.
 * - Un intercepteur est ajouté pour inclure automatiquement le token JWT depuis le localStorage
 *   dans l'en-tête `Authorization` de chaque requête, si disponible.
 *
 * @exemple
 * ```typescript
 * import API from './utils/axios';
 * API.get('/users').then(response => { ... });
 * ```
 *
 * @voir {@link https://axios-http.com/docs/instance}
 * @voir {@link https://axios-http.com/docs/interceptors}
 */
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api/', 
});

// Intercepteur pour ajouter automatiquement le token aux headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
