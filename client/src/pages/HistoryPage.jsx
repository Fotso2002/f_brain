// client/src/pages/HistoryPage.jsx

import React, { useState, useEffect } from 'react';
import { getTranslationHistory } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './HistoryPage.css'; // Importez le fichier CSS

function HistoryPage() {
  const [translations, setTranslations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setError('You are not logged in.');
      navigate('/login');
      return;
    }

    const fetchHistory = async () => {
      try {
        const response = await getTranslationHistory(accessToken);
        setTranslations(response.data); // L'API renvoie une liste de traductions
        setError('');
      } catch (err) {
        setError('Failed to fetch translation history.');
        console.error('History fetch error:', err.response ? err.response.data : err.message);
        if (err.response && err.response.status === 401) {
            // Si le token est invalide ou expiré, redirige vers la connexion
            navigate('/login');
        } else if (err.response && err.response.data) {
            setError(JSON.stringify(err.response.data));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory(); // Appelle la fonction pour charger l'historique au montage du composant

    // Vous pourriez vouloir recharger l'historique périodiquement si vous attendez des traductions asynchrones
    // const intervalId = setInterval(fetchHistory, 10000); // Recharge toutes les 10 secondes
    // return () => clearInterval(intervalId); // Nettoie l'intervalle au démontage du composant

  }, [navigate]); // Dépendance sur navigate

  return (
    <div className="history-container">
      <h2>Translation History</h2>
      {error && <p className="error-message">{error}</p>}
      {isLoading ? (
        <p>Loading history...</p>
      ) : translations.length === 0 ? (
        <p>No translations found yet.</p>
      ) : (
        <ul className="translation-list">
          {translations.map((translation) => (
            <li key={translation.id} className="translation-item">
              <p><strong>Original:</strong> {translation.original_text}</p>
              <p><strong>Translated:</strong> {translation.translated_text || 'Translation in progress...'}</p> {/* Affiche un message si pas encore traduit */}
              <p><strong>Languages:</strong> {translation.source_language.toUpperCase()} to {translation.target_language.toUpperCase()}</p>
              <p className="timestamp">{new Date(translation.timestamp).toLocaleString()}</p>
              {/* Vous pourriez ajouter un lien pour voir les détails si nécessaire */}
              {/* <Link to={`/history/${translation.id}`}>View Details</Link> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HistoryPage;