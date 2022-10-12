import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    setExpenses: (state, action) => {
      const inverted = action.payload.reverse();
      state.expenses = inverted;
    },
    deleteExpense: (state, action) => {
      const expenseIndex = state.expenses.findIndex(
        (expense) => expense.id === action.payload
      );
      state.expenses.splice(expenseIndex, 1);
      return state;
    },
    updateExpense: (state, action) => {
      const index = state.expenses.findIndex((expense) => expense.id === action.payload.id);
      state.expenses[index] = {
        ...state.expenses[index],
        description: action.payload.expenseData.description,
        amount: action.payload.expenseData.amount,
        date: action.payload.expenseData.date,
      };
      return state;
    }
  }
})

export const addExpense = expensesSlice.actions.addExpense;
export const setExpenses = expensesSlice.actions.setExpenses;
export const deleteExpense = expensesSlice.actions.deleteExpense;
export const updateExpense = expensesSlice.actions.updateExpense;
export default expensesSlice.reducer;