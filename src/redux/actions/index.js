export const SAVE_USER = 'SAVE_USER';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDITING_EXPENSE = 'EDITING_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const saveUser = (userEmail) => ({
  type: SAVE_USER,
  payload: userEmail,
});

export const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  payload: currencies,
});

export const saveExpense = (expense) => ({
  type: SAVE_EXPENSES,
  payload: expense,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const editingExpense = (id) => ({
  type: EDITING_EXPENSE,
  payload: id,
});

export const editiExpense = (obj) => ({
  type: EDIT_EXPENSE,
  payload: { ...obj },
});
