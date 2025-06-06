// client/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom'; // Importez Link
import './LoginPage.css'; // Importez le fichier CSS

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({ username, password });
      // Stockez les tokens dans le localStorage
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      // Redirigez l'utilisateur vers la page de traduction
      navigate('/translate');
    } catch (err) {
      // Gérez les erreurs de connexion
      setError('Login failed. Please check your username and password.');
      console.error('Login error:', err.response ? err.response.data : err.message);
      if (err.response && err.response.data) {
        setError(JSON.stringify(err.response.data));
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default LoginPage;