// client/src/pages/TranslatePage.jsx

import React, { useState, useEffect, useRef } from 'react'; // Importez useRef
import { translateText, getTranslationDetail } from '../services/api'; // Importez getTranslationDetail
import { useNavigate } from 'react-router-dom';
import './TranslatePage.css';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
  { code: 'de', name: 'German' },
  // Ajoutez d'autres langues ici
];

function TranslatePage() {
  const [originalText, setOriginalText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('fr');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentTranslationId, setCurrentTranslationId] = useState(null); // Nouvel état pour l'ID de la traduction en cours
  const navigate = useNavigate();

  const pollingIntervalRef = useRef(null); // Pour stocker l'ID de l'intervalle de polling

  // Vérifie si l'utilisateur est authentifié au chargement de la page
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/login');
    }

    // Nettoie l'intervalle de polling lors du démontage du composant
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [navigate]);

  // Logique de polling pour vérifier le résultat de la traduction
  useEffect(() => {
    if (currentTranslationId !== null) {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setError('You are not logged in.');
        navigate('/login');
        return;
      }

      // Démarre le polling
      pollingIntervalRef.current = setInterval(async () => {
        try {
          const response = await getTranslationDetail(currentTranslationId, accessToken);
          const translation = response.data;

          if (translation.translated_text) {
            // Si le texte traduit est disponible
            setTranslatedText(translation.translated_text);
            setIsLoading(false);
            setCurrentTranslationId(null); // Arrête le polling
            if (pollingIntervalRef.current) {
              clearInterval(pollingIntervalRef.current);
            }
          } else {
            // Le texte traduit n'est pas encore disponible, continue le polling
            setTranslatedText('Translation in progress...');
          }
        } catch (err) {
          setError('Failed to fetch translation result.');
          setIsLoading(false);
          setCurrentTranslationId(null);
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
          }
          console.error('Polling error:', err.response ? err.response.data : err.message);
        }
      }, 3000); // Interroge toutes les 3 secondes (ajustez si nécessaire)
    }
  }, [currentTranslationId, navigate]); // Dépendance sur currentTranslationId et navigate

  const handleTranslate = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setError('You are not logged in.');
      navigate('/login');
      return;
    }

    setIsLoading(true);
    setError('');
    setTranslatedText('Translation in progress...'); // Affiche le message immédiatement
    setCurrentTranslationId(null); // Réinitialise l'ID de la traduction précédente

    try {
      const response = await translateText(
        {
          original_text: originalText,
          source_language: sourceLanguage,
          target_language: targetLanguage,
        },
        accessToken
      );
      // L'API renvoie 202 Accepted et les détails de la traduction initiale (avec l'ID)
      const newTranslationId = response.data.id;
      setCurrentTranslationId(newTranslationId); // Stocke l'ID pour le polling

    } catch (err) {
      setError('Translation failed. Please try again.');
      setIsLoading(false);
      setCurrentTranslationId(null);
      console.error('Translation error:', err.response ? err.response.data : err.message);
      if (err.response && err.response.data) {
        setError(JSON.stringify(err.response.data));
      }
    }
  };

  return (
    <div className="translate-container">
      <h2>Translate Text</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleTranslate}>
        <div className="form-group">
          <label htmlFor="originalText">Original Text:</label>
          <textarea
            id="originalText"
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            rows="6"
            required
          ></textarea>
        </div>

        <div className="language-select-group">
          <div className="form-group">
            <label htmlFor="sourceLanguage">Source Language:</label>
            <select
              id="sourceLanguage"
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="targetLanguage">Target Language:</label>
            <select
              id="targetLanguage"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
               {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" disabled={isLoading || originalText.trim() === ''}> {/* Désactive si texte vide */}
          {isLoading ? 'Translating...' : 'Translate'}
        </button>
      </form>

      {translatedText && (
        <div className="translated-text-container">
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
}

export default TranslatePage;