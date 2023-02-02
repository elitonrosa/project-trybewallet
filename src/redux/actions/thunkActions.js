import { saveCurrencies } from './index';

const CURRENCIES_API = 'https://economia.awesomeapi.com.br/json/all';

const fetchAPI = async () => {
  const response = await fetch(CURRENCIES_API);
  const data = await response.json();
  const currencies = Object.keys(data).filter((el) => el !== 'USDT');
  return currencies;
};

export const getCurrencies = () => async (dispatch) => {
  const currencies = await fetchAPI();
  return dispatch(saveCurrencies(currencies));
};
