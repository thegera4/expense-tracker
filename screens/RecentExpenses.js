//import { useContext } from 'react';
import { useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
//import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses } from '../util/http';
import { setExpenses } from '../redux/expenses-slice';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function RecentExpenses() {
  //const expensesCtx = useContext(ExpensesContext);
  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
 
  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      try {
        const fetchedExpenses = await fetchExpenses();
        dispatch(setExpenses(fetchedExpenses));
        //expensesCtx.setExpenses(fetchedExpenses);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }
    getExpenses();
  }, []);

  //const recentExpenses = expensesCtx.expenses.filter((expense) => {
  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  function errorHandler(){
    setError(null);
  }

  if(error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

  if(isLoading) {
    return <LoadingOverlay/>
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;