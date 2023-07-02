import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserData } from '../apiCaller';

import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';

import UserActivityChart from '../components/UserActivityChart';
import UserSessionsChart from '../components/UserSessionsChart';
import UserPerformanceChart from '../components/UserPerformanceChart';
import UserTodayScoreChart from '../components/UserTodayScoreChart';
import UserDailyCards from '../components/UserDailyCards';

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
      <section className='user-header'>
        <h1 className='user-title'>Bonjour <span className="username">{firstName} {lastName}</span></h1>
        <p className='user-congrats'>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
      </section>
      <main className='user-body'>
        <section className='left'>
          <UserActivityChart />
          <section className='left-bottom'>
            <UserSessionsChart />
            <UserPerformanceChart />
            <UserTodayScoreChart />
          </section>
        </section>
        <section className='right'>
          <UserDailyCards />
        </section>
      </main>
    </React.Fragment>
  );
};

export default User;
