import React from 'react';

import '../assets/styles/KeyDataCard.scss';

const KeyDataCard = ({ keyName, value, image, bgColor }) => {
  return (
    <div className="key-data-card">
      <div className="key-data-card__icon" style={{ background: bgColor }}>
        <img src={image} alt={keyName} />
      </div>
      <div className="key-data-info">
        <p className="value">{value}{keyName === 'Calories' ? 'kCal' : 'g'}</p>
        <p className="key-name">{keyName}</p>
      </div>
    </div>
  );
};

export default KeyDataCard;