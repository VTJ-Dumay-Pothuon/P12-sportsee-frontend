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
        <h1 style={{ flexBasis: '100%' }}>Choisissez un utilisateur</h1>
        <ul>
          <li>
            <Link to="/user/12" style={{ fontSize: "30px", color: "black"}}>User 12</Link>
          </li>
          <br/>
          <li>
            <Link to="/user/18" style={{ fontSize: "30px", color: "black"}}>User 18</Link>
          </li>
        </ul>
      </main>
    </React.Fragment>
  );
};

export default Community;
