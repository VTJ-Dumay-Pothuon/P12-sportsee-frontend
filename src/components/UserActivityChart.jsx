import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserData } from '../apiCaller';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import '../assets/styles/UserActivityChart.scss';

const UserActivityChart = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData(id, '/user/:id/activity');
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [id, navigate]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { sessions } = userData;

  // Function to format the tick values of the X-axis
  const formatXAxisTick = (tickItem) => {
    const date = new Date(tickItem);
    return date.getDate();
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip--activity" style={{ backgroundColor: '#E60000' }}>
          <p>{`${payload[0].payload.kilogram}kg`}</p>
          <p>{`${payload[0].payload.calories}kCal`}</p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">Activité quotidienne</h2>
      <ResponsiveContainer width="100%" height="100%">
      <BarChart data={sessions} margin={{ top: 60, right: 15, left: 12, bottom: 5 }} barGap={8}>
          <CartesianGrid vertical={false} />
          <CartesianGrid  stroke="#DEDEDE" strokeDasharray="3 3" horizontal={true} />
          <XAxis dataKey="day" tickFormatter={formatXAxisTick} 
          axisLine={{ stroke: '#DEDEDE' }} scale='point' />
          <YAxis yAxisId="left" orientation="left" hide={true} />
          <YAxis yAxisId="right" orientation="right" axisLine={false} 
          tickMargin={50} tick={{ fill: '#74798C' }} tickCount={3} 
          domain={['dataMin - 10', 'dataMax + 5']} />
          <Tooltip content={<CustomTooltip />} />
          <Legend align="right" verticalAlign="top" 
          wrapperStyle={{ top: 0 }} iconType="circle" iconSize="8" />
          <Bar dataKey="kilogram" fill="#282D30" 
          name={<span className="legend-text">Poids (kg)</span>} barSize={7} 
          radius={[3, 3, 0, 0]} yAxisId="right" />
          <Bar dataKey="calories" fill="#E60000" 
          name={<span className="legend-text">Calories brûlées (kCal)</span>} 
          barSize={7} radius={[3, 3, 0, 0]} yAxisId="left" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserActivityChart;