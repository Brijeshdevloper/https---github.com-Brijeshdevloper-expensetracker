'use client';

import React, { useState, useEffect, useCallback } from 'react';
import IncomeDisplay from '@/components/IncomeDisplay';
import ExpenseDisplay from '@/components/ExpenseDisplay';
import IncomeExpenseForm from '@/components/IncomeExpenseForm';
import TransactionTable from '@/components/TransactionTable';
import ExpenseChart from '@/components/ExpenseChart';

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [balance, setBalance] = useState(0);

  const calculateTotals = useCallback(() => {
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      } else if (transaction.type === 'expense') {
        totalExpenses += transaction.amount;
      }
    });

    setIncome(totalIncome);
    setExpenses(totalExpenses);
    setBalance(totalIncome - totalExpenses);
  }, [transactions]);

  useEffect(() => {
    const initialTransactions = [
      { date: '2024-08-01', amount: 50, category: 'Food', type: 'expense' },
      { date: '2024-08-02', amount: 100, category: 'Rent', type: 'expense' },
      { date: '2024-08-03', amount: 2000, category: 'Salary', type: 'income' },
    ];

    setTransactions(initialTransactions);
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [transactions, calculateTotals]);

  const addTransaction = (newTransaction) => {
    setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <IncomeDisplay income={income} />
        <ExpenseDisplay expenses={expenses} />
        <IncomeDisplay income={balance} title="Balance" />
      </div>
      <ExpenseChart transactions={transactions} />
      <IncomeExpenseForm addTransaction={addTransaction} />
      <TransactionTable transactions={transactions} />
    </div>
  );
};

export default Home;
