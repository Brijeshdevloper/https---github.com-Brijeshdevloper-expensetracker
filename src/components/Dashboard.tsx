"use client";

import React, { useState, useEffect, useCallback } from 'react';
import IncomeDisplay from '@/components/IncomeDisplay';
import ExpenseDisplay from '@/components/ExpenseDisplay';
import IncomeExpenseForm from '@/components/IncomeExpenseForm';
import TransactionTable from '@/components/TransactionTable';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar, SidebarSeparator } from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ExpenseChart from '@/components/ExpenseChart';

const Dashboard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    <SidebarProvider>
      <div className="md:pl-64">
        <Sidebar className="w-64 fixed inset-y-0 flex flex-col z-50">
          <SidebarHeader>
            <Button variant="ghost" className="ml-auto md:hidden">
              <Icons.close className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src="https://picsum.photos/50/50" alt="Avatar" />
                <AvatarFallback>TIE</AvatarFallback>
              </Avatar>
              <h2 className="font-semibold text-lg">TrackItEasy</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Icons.home className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Icons.plusCircle className="mr-2 h-4 w-4" />
                  <span>Add Transaction</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Icons.pieChart className="mr-2 h-4 w-4" />
                  <span>Analytics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Icons.settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarSeparator />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start pl-2">
                  <Avatar className="mr-2 h-6 w-6">
                    <AvatarImage src="https://picsum.photos/50/50" alt="Avatar" />
                    <AvatarFallback>TIE</AvatarFallback>
                  </Avatar>
                  <span>TrackItEasy</span>
                  <Icons.chevronDown className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <IncomeDisplay income={income} />
            <ExpenseDisplay expenses={expenses} />
            <IncomeDisplay income={balance} title="Balance" />
          </div>
          <ExpenseChart />
          {children}
          <IncomeExpenseForm addTransaction={addTransaction} />
          <TransactionTable transactions={transactions} />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
