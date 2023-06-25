import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserData } from '../apiCaller';
import KeyDataCard from './KeyDataCard';

import '../assets/styles/UserDailyCards.scss';

import caloriesImage from '../assets/images/calories.svg';
import proteinsImage from '../assets/images/proteins.svg';
import carbsImage from '../assets/images/carbs.svg';
import lipidsImage from '../assets/images/lipids.svg';

const UserDailyCards = () => {
  const { id } = useParams();
  const [keyData, setKeyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData(id, '/user/:id');
        setKeyData(data.keyData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (keyData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-daily-cards">
      <KeyDataCard
        keyName="Calories"
        value={keyData.calorieCount}
        image={caloriesImage}
        bgColor="rgba(255, 0, 0, 0.07)"
      />
      <KeyDataCard
        keyName="Protéines"
        value={keyData.proteinCount}
        image={proteinsImage}
        bgColor="rgba(74, 184, 255, 0.1)"
      />
      <KeyDataCard
        keyName="Glucides"
        value={keyData.carbohydrateCount}
        image={carbsImage}
        bgColor="rgba(249, 206, 35, 0.1)"
      />
      <KeyDataCard
        keyName="Lipides"
        value={keyData.lipidCount}
        image={lipidsImage}
        bgColor="rgba(253, 81, 129, 0.1)"
      />
    </div>
  );
};

export default UserDailyCards;