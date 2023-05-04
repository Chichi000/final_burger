import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export default function UserSalesChart({ data }) {
  const barColors = ['#1f77b4', '#ff7f0e', '#2ca02c'];
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Filter the orders based on the selected date range
  const filteredData = data.filter(
    (order) =>
      (!startDate || new Date(order.createdAt) >= startDate) &&
      (!endDate || new Date(order.createdAt) <= endDate)
  );

  return (
    <div>
      <div >
        <label htmlFor="startDate">Start Date:</label>
        <DatePicker
          id="startDate"
          selected={startDate}
          onChange={handleStartDateChange}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date:</label>
        <DatePicker
          id="endDate"
          selected={endDate}
          onChange={handleEndDateChange}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <ResponsiveContainer width="90%" height={600}>
        <BarChart data={filteredData}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="userDetails.name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" stroke="#000000" strokeWidth={5}>
            {filteredData.map((item, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
