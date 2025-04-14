"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MinusCircle } from "lucide-react";

interface ExpenseDisplayProps {
  expenses: number;
}

const ExpenseDisplay: React.FC<ExpenseDisplayProps> = ({ expenses }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
        <MinusCircle className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          ${expenses}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseDisplay;
