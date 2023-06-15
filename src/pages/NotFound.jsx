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
        <div className="content">
          <h2>404 - Page Not Found</h2>
          <p>The page you are looking for does not exist.</p>
          <Link to="/">Go to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;