import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { getUserData } from '../apiCaller';

import '../assets/styles/UserPerformanceChart.scss';

const UserPerformanceChart = () => {
  const { id } = useParams();
  const [performanceData, setPerformanceData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData(id, '/user/:id/performance');
        setPerformanceData(data);
      } catch (error) {
        console.error('Error fetching performance data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!performanceData) {
    return <div>Loading...</div>;
  }

  // Map kind values to labels
  const performanceLabels = performanceData.kind;

  return (
    <RadarChart
      cx={130}
      cy={130}
      width={260}
      height={260}
      outerRadius={80}
      startAngle={210}
      endAngle={570}
      data={performanceData.data}
      style={{ backgroundColor: '#282D30', borderRadius: '5px' }}
      className='performance-chart'
    >
      <PolarGrid gridType="polygon" radialLines={false}  />
      <PolarAngleAxis dataKey="kind" tick={{ fill: '#FFF', fontSize: '12px' }} tickFormatter={label => performanceLabels[label]} />
      <Radar dataKey="value" stroke={false} fill="#F11" fillOpacity={0.7} />
    </RadarChart>
  );
};

export default UserPerformanceChart;