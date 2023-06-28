import React from 'react';
import { Link } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';

const NotFound = () => {
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <main className='error-page'>
          <h2>404 - Utilisateur introuvable</h2>
          <p>L'utilisateur que vous recherchez n'existe pas.</p>
          <Link to="/">Retour à la page d'accueil</Link>
        </main>
      </div>
    </div>
  );
};

export default NotFound;