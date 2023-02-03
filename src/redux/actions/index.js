export const SAVE_USER = 'SAVE_USER';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';

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
