import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getUserData } from '../apiCaller';

import '../assets/styles/UserSessionsChart.scss';

const UserSessionsChart = () => {
  const { id } = useParams();
  const [sessionsData, setSessionsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData(id, '/user/:id/average-sessions');
        setSessionsData(data.sessions);
      } catch (error) {
        console.error('Error fetching average sessions data:', error);
      }
    };

    fetchData();
  }, [id]);

  const convertToFrenchDay = (day) => {
    const daysInFrench = ['','L', 'M', 'M', 'J', 'V', 'S', 'D',''];
    return daysInFrench[day];
  };

  if (!sessionsData) {
    return <div>Loading...</div>;
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const isStartPoint = payload[0].payload.day === 0;
        const isEndPoint = payload[0].payload.day === sessionsData.length + 1;
        if (isStartPoint || isEndPoint) { return null }
        return (
        <div className="custom-tooltip--sessions" style={{ backgroundColor: '#FFF' }}>
          <p>{`${payload[0].payload.sessionLength} min`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = () => {
    return <p className="custom-legend--sessions">Durée moyenne des sessions</p>;
  };

  // Extrapolate the line trajectory by adding extra data points
  const extrapolatedData = [
    { day: 0, sessionLength: sessionsData[0].sessionLength + 
      (sessionsData[0].sessionLength - sessionsData[1].sessionLength) },
    // Add an extra data point before the first data point
    ...sessionsData,
    { day: sessionsData.length + 1, sessionLength: sessionsData[sessionsData.length - 1].sessionLength + 
      (sessionsData[sessionsData.length - 1].sessionLength/2 - 
      sessionsData[sessionsData.length - 2].sessionLength) },
    // Add an extra data point after the last data point
  ];

  return (
    <div className="chart-container-small">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={extrapolatedData} margin={{ top: 0, right: 0, left: 0, bottom: -30 }}
        style={{ backgroundColor: '#F00',  borderRadius: '5px' }} className='sessions-chart'>
          <defs>
            <linearGradient id="lineGradient">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
            </linearGradient>
            <filter id="dotShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx={0} dy={0} stdDeviation={5} floodColor="rgba(255, 255, 255, 0.5)" />
            </filter>
          </defs>
          <XAxis
            dataKey="day"
            tickFormatter={convertToFrenchDay}
            axisLine={{ stroke: 'none' }}
            tick={{ fill: '#FFF', dy: -30 }}
          />
          <YAxis hide domain={['dataMin - 30', 'dataMax + 50']} />
          <Tooltip content={<CustomTooltip />} />
          <Legend iconType="none" content={CustomLegend} layout="vertical" 
          verticalAlign="top" align="left" />
          <Line
            dataKey="sessionLength"
            type="basis"
            dot={false}
            activeDot={({ cx, cy }) => !(cx <= 0 || cx >= 250 ) ? (
                <circle cx={cx} cy={cy} r={4} fill="white" filter="url(#activeDotShadow)" />
            ) : null }
            name={<span className="legend-text">Durée moyenne des sessions</span>}
            stroke="url(#lineGradient)"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserSessionsChart;
