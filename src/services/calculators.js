export const totalExpenses = (expenses) => {
  const total = expenses
    .map((expense) => {
      const { value, currency, exchangeRates } = expense;
      const { ask } = exchangeRates[currency];
      return value * ask;
    })
    .reduce((acc, curr) => (acc + curr), 0);
  return total;
};
