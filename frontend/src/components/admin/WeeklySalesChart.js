import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function WeeklySalesChart({ data }) {
  const [xValues, setXValues] = useState([]);

  const formatWeek = (date) => {
    if (!xValues.includes(date.week)) {
      setXValues([...xValues, date.week]);
    }
    return '';
  };

  const groupedData = data.reduce((acc, curr) => {
    const week = curr.week;
    const index = acc.findIndex((el) => el.week === week);
    if (index !== -1) {
      acc[index].total += curr.total;
    } else {
      acc.push({ week: week, total: curr.total });
    }
    return acc;
  }, []);

  return (
    <ResponsiveContainer width="90%" height={600}>
      <BarChart data={groupedData}>
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="week" tickFormatter={formatWeek} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
