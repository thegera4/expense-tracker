import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [
       {
          id: 'e1',
          description: 'A pair of shoes',
          amount: 59.99,
          date: new Date('2022-10-05'),
        },
        {
          id: 'e2',
          description: 'A pair of trousers',
          amount: 89.29,
          date: new Date('2022-01-05'),
        },
        {
          id: 'e3',
          description: 'Some bananas',
          amount: 5.99,
          date: new Date('2022-10-07'),
        },
        {
          id: 'e4',
          description: 'A book',
          amount: 14.99,
          date: new Date('2022-02-19'),
        },
        {
          id: 'e5',
          description: 'Another book',
          amount: 18.59,
          date: new Date('2022-02-18'),
        },
        {
          id: 'e6',
          description: 'A pair of glasses',
          amount: 89.29,
          date: new Date('2022-01-05'),
        },
        {
          id: 'e7',
          description: 'Some strawberries',
          amount: 5.99,
          date: new Date('2021-12-01'),
        },
        {
          id: 'e8',
          description: 'A phone case',
          amount: 14.99,
          date: new Date('2022-02-19'),
        },
        {
          id: 'e9',
          description: 'A new charging cable',
          amount: 18.59,
          date: new Date('2022-02-18'),
        },
    ],
  },
  reducers: {
    addExpense: (state, action) => {
      const id = new Date().toString() + Math.random().toString();
      const newExpense = {
        id: id,
        description: action.payload.description,
        amount: action.payload.amount,
        date: action.payload.date,
      };
      state.expenses.push(newExpense);
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
      console.log(action.payload.expenseData);
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
export const deleteExpense = expensesSlice.actions.deleteExpense;
export const updateExpense = expensesSlice.actions.updateExpense;
export default expensesSlice.reducer;