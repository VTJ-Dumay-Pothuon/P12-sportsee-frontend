import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserData } from '../apiCaller';

import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import UserActivityChart from '../components/UserActivityChart';

import '../assets/styles/User.scss';

const User = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData(id, '/user/:id');
        setUserData(data);
      } catch (error) {
        navigate('/community');
      }
    };

    fetchData();
  }, [id, navigate]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { firstName, lastName } = userData.userInfos;

  return (
    <React.Fragment>
      <Topbar />
      <Sidebar />
      <main>
        <h1>Bonjour <span class="username">{firstName} {lastName}</span></h1>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        <UserActivityChart />
      </main>
    </React.Fragment>
  );
};

export default User;
