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
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Expenses by Category</h2>
      <div className="flex items-center">
        <ResponsiveContainer width="70%" height={300}>
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
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="w-30%">
          <ul>
            {data.map((entry, index) => (
              <li key={index} className="flex items-center mb-2">
                <div
                  className="mr-2 w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span>{entry.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;

    