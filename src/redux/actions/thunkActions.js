import { saveCurrencies, saveExpense } from './index';

const CURRENCIES_API = 'https://economia.awesomeapi.com.br/json/all';

const fetchAPI = async () => {
  const response = await fetch(CURRENCIES_API);
  const data = await response.json();
  return data;
};

export const getCurrencies = () => async (dispatch) => {
  const currencies = await fetchAPI();
  delete currencies.USDT;
  return dispatch(saveCurrencies(Object.keys(currencies)));
};

export const getCurrenciesWithRates = (expense) => async (dispatch, getState) => {
  const currencies = await fetchAPI();
  const { expenses } = getState().wallet;
  return dispatch(saveExpense({
    ...expense,
    id: expenses.length === 0 ? 0 : expenses.length,
    exchangeRates: currencies,
  }));
};
