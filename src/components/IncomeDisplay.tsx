"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface IncomeDisplayProps {
  income: number;
  title?: string;
}

const IncomeDisplay: React.FC<IncomeDisplayProps> = ({ income, title }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title || "Total Income"}</CardTitle>
        <DollarSign className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          ${income}
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeDisplay;

