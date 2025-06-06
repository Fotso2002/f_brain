// client/src/App.jsx

// Vous pouvez supprimer ces imports si vous supprimez le code Vite/React par défaut
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';

// Importez vos composants de page
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import TranslatePage from './pages/TranslatePage';
import HistoryPage from './pages/HistoryPage';

function App() {
  // Vous pouvez supprimer ce state si vous supprimez le code Vite/React par défaut
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* Barre de navigation simple (temporaire) */}
      <nav>
        <ul>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/translate">Translate</Link></li>
          <li><Link to="/history">History</Link></li>
        </ul>
      </nav>

      {/* Définition des routes */}
      <Routes>
        {/* Utilisez vos composants de page importés */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/translate" element={<TranslatePage />} />
        <Route path="/history" element={<HistoryPage />} />
        {/* Route par défaut (vous pouvez la modifier plus tard) */}
        <Route path="/" element={<div>Home Page</div>} />
      </Routes>

      {/* Le reste de votre code App.jsx (vous pouvez le supprimer ou le modifier) */}
      {/* Vous pouvez supprimer cette section si vous ne voulez pas du contenu par défaut */}
      {/*
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      */}
    </>
  );
}

export default App;