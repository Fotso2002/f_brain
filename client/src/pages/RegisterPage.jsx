// client/src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom'; // Ajoutez Link ici
import './RegisterPage.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser({ username, email, password });
      setSuccess('Registration successful! Redirecting to login...');
      setError('');
      // Redirigez l'utilisateur vers la page de connexion après un court délai
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirige après 2 secondes
    } catch (err) {
      // Gérez les erreurs d'enregistrement (par exemple, nom d'utilisateur déjà pris)
      setError('Registration failed. Please try again.');
      setSuccess('');
      console.error('Registration error:', err.response ? err.response.data : err.message);
      // Vous pouvez afficher des messages d'erreur plus spécifiques si l'API les fournit
      if (err.response && err.response.data) {
        setError(JSON.stringify(err.response.data));
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {success && <p className="success-message">{success}</p>}
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default RegisterPage;