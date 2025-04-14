"use client";

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

type Expense = {
  category: string;
  value: number;
};

const ExpenseChart = () => {
  const [data, setData] = useState<Expense[]>([
    { category: 'Food', value: 400 },
    { category: 'Rent', value: 300 },
    { category: 'Transport', value: 300 },
    { category: 'Utilities', value: 200 },
  ]);

  useEffect(() => {
    // You can fetch your expense data here and update the state
    // Example:
    // fetchData().then(expenses => {
    //   setData(expenses);
    // });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpenseChart;
