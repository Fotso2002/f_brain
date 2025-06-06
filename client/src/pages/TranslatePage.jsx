// client/src/pages/TranslatePage.jsx

import React, { useState, useEffect } from 'react';
import { translateText } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './TranslatePage.css'; // Importez le fichier CSS

// Liste simple de langues (vous pouvez l'étendre)
const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
  { code: 'de', name: 'German' },
  // Ajoutez d'autres langues ici
];

function TranslatePage() {
  const [originalText, setOriginalText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en'); // Langue source par défaut
  const [targetLanguage, setTargetLanguage] = useState('fr'); // Langue cible par défaut
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Vérifie si l'utilisateur est authentifié au chargement de la page
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      // Si pas de token, redirige vers la page de connexion
      navigate('/login');
    }
  }, [navigate]); // Dépendance sur navigate pour éviter les avertissements

  const handleTranslate = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setError('You are not logged in.');
      navigate('/login'); // Redirige si le token a disparu
      return;
    }

    setIsLoading(true);
    setError('');
    setTranslatedText(''); // Réinitialise le texte traduit

    try {
      const response = await translateText(
        {
          original_text: originalText,
          source_language: sourceLanguage,
          target_language: targetLanguage,
        },
        accessToken
      );
      // L'API renvoie 202 Accepted et les détails de la traduction initiale
      // Le texte traduit sera mis à jour de manière asynchrone par Celery
      // Pour l'instant, nous affichons un message indiquant que la traduction est en cours
      setTranslatedText('Translation in progress...');
      console.log('Translation request accepted:', response.data);

      // Dans une application réelle, vous pourriez interroger l'historique
      // ou utiliser WebSockets pour obtenir le résultat de la traduction asynchrone.
      // Pour ce guide, l'utilisateur devra aller sur la page d'historique pour voir le résultat final.

    } catch (err) {
      setError('Translation failed. Please try again.');
      console.error('Translation error:', err.response ? err.response.data : err.message);
      if (err.response && err.response.data) {
        setError(JSON.stringify(err.response.data));
      }
    } finally {
      setIsLoading(false);
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

        <button type="submit" disabled={isLoading}>
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