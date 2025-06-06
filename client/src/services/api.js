// client/src/services/api.js

import axios from 'axios';

// Crée une instance Axios avec l'URL de base de votre API
// Nginx route le trafic vers le backend via /api/
const api = axios.create({
  baseURL: 'http://localhost/api/', // Utilisez l'URL de base de votre API via Nginx
});

// Fonction pour enregistrer un nouvel utilisateur
export const registerUser = (userData) => {
  return api.post('register/', userData);
};

// Fonction pour obtenir un token JWT (connexion)
export const loginUser = (credentials) => {
  return api.post('token/', credentials);
};

// Fonction pour rafraîchir un token JWT
export const refreshToken = (refreshToken) => {
  return api.post('token/refresh/', { refresh: refreshToken });
};

// Fonction pour effectuer une traduction
export const translateText = (translationData, accessToken) => {
  return api.post('translate/', translationData, {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Inclut le token d'accès dans l'en-tête
    },
  });
};

// Fonction pour obtenir l'historique des traductions
export const getTranslationHistory = (accessToken) => {
  return api.get('history/', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// Fonction pour obtenir les détails d'une traduction spécifique
export const getTranslationDetail = (translationId, accessToken) => {
  return api.get(`history/${translationId}/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// Vous pouvez ajouter d'autres fonctions API ici