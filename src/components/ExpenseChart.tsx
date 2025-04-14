"use client";

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AEC49F', '#BB8042'];

type Expense = {
  category: string;
  value: number;
};

interface ExpenseChartProps {
  transactions: { date: string; amount: number; category: string; type: string }[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ transactions }) => {
  const [data, setData] = useState<Expense[]>([]);

  useEffect(() => {
    // Calculate expenses by category
    const categoryExpenses: { [key: string]: number } = {};
    transactions.forEach(transaction => {
      if (transaction.type === 'expense') {
        if (categoryExpenses[transaction.category]) {
          categoryExpenses[transaction.category] += transaction.amount;
        } else {
          categoryExpenses[transaction.category] = transaction.amount;
        }
      }
    });

    // Convert categoryExpenses to array format for recharts
    const chartData: Expense[] = Object.keys(categoryExpenses).map(category => ({
      category: category,
      value: categoryExpenses[category],
      name: category // Added name property for labels
    }));

    setData(chartData);
  }, [transactions]);

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
          nameKey="name" // Specify the nameKey for labels
          label={({ name, cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
            const RADIAN = Math.PI / 180;
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
              >
                {name} ({percent * 100}%)
              </text>
            );
          }}
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
