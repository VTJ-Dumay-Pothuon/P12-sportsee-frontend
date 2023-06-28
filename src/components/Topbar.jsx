import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../assets/images/sportsee.svg';

import '../assets/styles/Topbar.scss';

const Topbar = () => {
  return (
    <header className="topbar">
      <div className="logo">
        <img src={Logo} alt="SportSee Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <Link>Accueil</Link>
          </li>
          <li>
            <Link>Profil</Link>
          </li>
          <li>
            <Link>Réglage</Link>
          </li>
          <li>
            <Link to="/">Communauté</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Topbar;