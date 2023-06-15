import React from 'react';
import { Link } from 'react-router-dom';

import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';

const Community = () => {
  return (
    <React.Fragment>
      <Topbar />
      <Sidebar />
      <main className="userlist">
        <h1>Choisissez un utilisateur</h1>
        <ul>
          <li>
            <Link to="/user/12">User 12</Link>
          </li>
          <li>
            <Link to="/user/18">User 18</Link>
          </li>
        </ul>
      </main>
    </React.Fragment>
  );
};

export default Community;
