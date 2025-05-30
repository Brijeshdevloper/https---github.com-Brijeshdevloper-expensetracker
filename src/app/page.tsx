'use client';

import React, { useState, useEffect, useCallback } from 'react';
import IncomeDisplay from '@/components/IncomeDisplay';
import ExpenseDisplay from '@/components/ExpenseDisplay';
import IncomeExpenseForm from '@/components/IncomeExpenseForm';
import TransactionTable from '@/components/TransactionTable';
import ExpenseChart from '@/components/ExpenseChart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [balance, setBalance] = useState(0);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch('/api/transactions');
      if (response.ok) {
        const transactionData = await response.json();
        setTransactions(transactionData);
      } else {
        console.error('Failed to fetch transactions:', response.status);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }, []);

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
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    calculateTotals();
  }, [transactions, calculateTotals]);

  const addTransaction = async (newTransaction) => {
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });

      if (response.ok) {
        fetchTransactions(); // Refresh transactions after adding
      } else {
        console.error('Failed to add transaction:', response.status);
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const incomeExpenseData = [
    { name: 'Total', income: income, expenses: expenses },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <IncomeDisplay income={income} />
        <ExpenseDisplay expenses={expenses} />
        <IncomeDisplay income={balance} title="Balance" />
      </div>

      <IncomeExpenseForm addTransaction={addTransaction} />
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Income vs Expenses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={incomeExpenseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#82ca9d" name="Income" />
            <Bar dataKey="expenses" fill="#FF0000" name="Expense" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <TransactionTable transactions={transactions} />

      <ExpenseChart transactions={transactions} />
    </div>
  );
};

export default Home;
