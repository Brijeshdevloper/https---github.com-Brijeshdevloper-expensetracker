"use client";

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

// Define a type for the transaction
type Transaction = {
  _id: string;
  date: string;
  amount: number;
  category: string;
  type: string;
};

interface TransactionTableProps {
    transactions: Transaction[];
    fetchTransactions: () => Promise<void>;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, fetchTransactions }) => {
  // Sorting state
  const [sortColumn, setSortColumn] = useState<keyof Transaction | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Function to handle sorting
  const handleSort = (column: keyof Transaction) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Function to sort the transactions
  const sortedTransactions = [...transactions].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    } else {
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    }
  });

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/transactions?id=${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchTransactions(); // Refresh transactions after deleting
            } else {
                console.error('Failed to delete transaction:', response.status);
            }
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

  return (
    <Table>
      <TableCaption>A list of your recent transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead onClick={() => handleSort('date')}>Date</TableHead>
          <TableHead onClick={() => handleSort('amount')}>Amount</TableHead>
          <TableHead onClick={() => handleSort('category')}>Category</TableHead>
          <TableHead onClick={() => handleSort('type')}>Type</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedTransactions.map((transaction, index) => (
          <TableRow key={index}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell>{transaction.type}</TableCell>
               <TableCell>
                  <Button onClick={() => handleDelete(transaction._id)} variant="destructive" size="sm">
                      Delete
                  </Button>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
