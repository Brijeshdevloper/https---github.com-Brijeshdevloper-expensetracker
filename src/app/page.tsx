import IncomeExpenseForm from '@/components/IncomeExpenseForm';
import TransactionTable from '@/components/TransactionTable';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TrackItEasy</h1>
      <IncomeExpenseForm />
      <TransactionTable />
    </div>
  );
}
