//import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
//import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { useSelector } from 'react-redux';

function RecentExpenses() {
  //const expensesCtx = useContext(ExpensesContext);
  const expenses = useSelector((state) => state.expenses.expenses);

  //const recentExpenses = expensesCtx.expenses.filter((expense) => {
  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;