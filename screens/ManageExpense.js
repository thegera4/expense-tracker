import { useLayoutEffect } from 'react';
//import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
//import { ExpensesContext } from '../store/expenses-context';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, deleteExpense, updateExpense } from '../redux/expenses-slice';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

function ManageExpense({ route, navigation }) {
  //const expensesCtx = useContext(ExpensesContext);
  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const selectedExpense = expenses.find((expense) => expense.id === editedExpenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    //expensesCtx.deleteExpense(editedExpenseId);
    dispatch(deleteExpense(editedExpenseId));
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData) {
    if (isEditing) {
      /*expensesCtx.updateExpense(
        editedExpenseId,
        {
          description: 'Test!!!!',
          amount: 29.99,
          date: new Date('2022-05-20'),
        }
      );*/
      dispatch(updateExpense({ id: editedExpenseId, expenseData: expenseData }));
    } else {
      /*expensesCtx.addExpense({
        description: 'Test',
        amount: 19.99,
        date: new Date('2022-05-19'),
      });*/
      
      dispatch(addExpense(expenseData));
    }
    navigation.goBack();
  }

  return (
      <View style={styles.modal} >
        <View style={styles.container}>
          <ExpenseForm 
            defaultValues={selectedExpense}
            submitButtonLabel={isEditing ? 'Update' : 'Add'}
            onSubmit={confirmHandler}
            onCancel={cancelHandler}
          />
          {isEditing && (
            <View style={styles.deleteContainer}>
              <IconButton
                icon="trash"
                color={GlobalStyles.colors.error500}
                size={36}
                onPress={deleteExpenseHandler}
              />
            </View>
          )}
        </View>
      </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  modal: {
    height: '100%',
    marginTop: 'auto',
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});