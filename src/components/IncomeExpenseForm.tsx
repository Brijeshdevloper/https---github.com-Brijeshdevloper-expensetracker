"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface IncomeExpenseFormProps {
  addTransaction: (transaction: { date: string; amount: number; category: string; type: string }) => void;
}

const IncomeExpenseForm: React.FC<IncomeExpenseFormProps> = ({ addTransaction }) => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense'); // 'income' or 'expense'
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate amount as a number
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue)) {
      toast({
        title: "Error",
        description: "Please enter a valid amount.",
      })
      return;
    }

    const newTransaction = {
      date,
      amount: amountValue,
      category,
      type,
    };

    addTransaction(newTransaction);

    toast({
      title: "Success",
      description: "Transaction added successfully.",
    })

    // Reset form fields
    setDate('');
    setAmount('');
    setCategory('');
    setType('expense');
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" value={category} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="rent">Rent</SelectItem>
              <SelectItem value="transport">Transport</SelectItem>
              <SelectItem value="salary">Salary</SelectItem>
              <SelectItem value="investments">Investments</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <Select onValueChange={setType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" value={type} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="expense">Expense</SelectItem>
              <SelectItem value="income">Income</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit">Add Transaction</Button>
    </form>
  );
};

export default IncomeExpenseForm;
