'use client';

import IncomeDisplay from '@/components/IncomeDisplay';
import ExpenseDisplay from '@/components/ExpenseDisplay';
import { useState, useEffect } from 'react';
import IncomeExpenseForm from '@/components/IncomeExpenseForm'; // Import IncomeExpenseForm
import TransactionTable from '@/components/TransactionTable';

export default function Home() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    // Dummy data for transactions
    const transactions = [
      { date: '2024-08-01', amount: 50, category: 'Food', type: 'expense' },
      { date: '2024-08-02', amount: 100, category: 'Rent', type: 'expense' },
      { date: '2024-08-03', amount: 2000, category: 'Salary', type: 'income' },
    ];

    // Calculate total income and expenses
    const totalIncome = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const totalExpenses = transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    setIncome(totalIncome);
    setExpenses(totalExpenses);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TrackItEasy</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <IncomeDisplay income={income} />
        <ExpenseDisplay expenses={expenses} />
      </div>
      <IncomeExpenseForm />
      <TransactionTable />
    </div>
  );
}

