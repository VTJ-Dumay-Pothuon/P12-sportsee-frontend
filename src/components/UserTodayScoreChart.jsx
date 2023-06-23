import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RadialBarChart, RadialBar, Cell, LabelList } from 'recharts';
import { getUserData } from '../apiCaller';

import '../assets/styles/UserTodayScoreChart.scss';

const UserTodayScoreChart = () => {
  const { id } = useParams();
  const [todayScore, setTodayScore] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData(id, '/user/:id');
        setTodayScore(data.score * 100);
        if (!data.score) {
          setTodayScore(data.todayScore * 100);
        }
      } catch (error) {
        console.error('Error fetching today score:', error);
      }
    };

    fetchData();
  }, [id]);

  if (todayScore === null) {
    return <div>Loading...</div>;
  }

  // Calculate the start and end angles based on the todayScore value
  const startAngle = 90;
  const endAngle = 90 + 3.6 * todayScore;

  const renderCustomLabel = ({ cx, cy }) => (
    <g>
      <text x={cx} y={cy} textAnchor="middle" className="objective">
        <tspan x={cx} dy="-0.4em" fontSize="26px" fill="#282D30">{`${todayScore.toFixed(0)}%`}</tspan>
        <tspan x={cx} dy="1.2em"  fontSize="18px" fill="#74798C">de votre</tspan>
        <tspan x={cx} dy="1.2em"  fontSize="18px" fill="#74798C">objectif</tspan>
      </text>
      <text x={cx - 100} y={cy - 100} textAnchor="start" className="score-label" fill="#20253A">
        Score
      </text>
    </g>
  ); 

  return (
    <RadialBarChart
      width={260}
      height={260}
      innerRadius="70%"
      outerRadius="80%"
      data={[{ value: todayScore }]}
      startAngle={startAngle}
      endAngle={endAngle}
    >
      <RadialBar
        minAngle={15}
        background
        clockWise
        dataKey="value"
        fill="#F00"
        label={<LabelList position="insideStart" fill="#FFF" fontSize="14px" />}
        cornerRadius={'50%'}>
        <LabelList content={renderCustomLabel} />
        <Cell fill="#F00" />
      </RadialBar>
    </RadialBarChart>
  );
};

export default UserTodayScoreChart;