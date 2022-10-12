//import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
//import { ExpensesContext } from '../store/expenses-context';
import { useSelector } from 'react-redux';


function AllExpenses() {
  //const expensesCtx = useContext(ExpensesContext);
  let expenses = useSelector((state) => state.expenses.expenses);

  return (
    <ExpensesOutput
      //expenses={expensesCtx.expenses}
      expenses={expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found!"
    />
  );
}

export default AllExpenses;