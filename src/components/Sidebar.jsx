import React from 'react';

import Yoga from '../assets/images/yoga.svg';
import Swimming from '../assets/images/swimming.svg';
import Bike from '../assets/images/bike.svg';
import Weightlift from '../assets/images/weightlift.svg';

import '../assets/styles/Sidebar.scss';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={Yoga} alt="Yoga" />
      </div>
      <div className="logo">
        <img src={Swimming} alt="Swimming" />
      </div>
      <div className="logo">
        <img src={Bike} alt="Bike" />
      </div>
      <div className="logo">
        <img src={Weightlift} alt="Weightlift" />
      </div>
      <div className="copyright">
        <p>Copyright, SportSee 2020</p>
      </div>
    </aside>
  );
};

export default Sidebar;