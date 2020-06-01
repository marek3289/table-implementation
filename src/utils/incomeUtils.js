export const getValues = (object) => object.map((val) => val.value);

export const sumTotalIncome = (object) => {
  const total = getValues(object).reduce(
    (prev, curr) => prev + parseInt(curr, 10),
    0,
  );
  return total;
};

export const sumAverageIncome = (object) => {
  const average =
    getValues(object).reduce((prev, curr) => prev + parseInt(curr, 10), 0) /
    getValues(object).length;
  return average;
};

export const sumLastMonthIncome = (object) => {
  const today = new Date();
  let lastMonth = today.getMonth() - 1;
  let relevantYear = today.getFullYear();

  if (lastMonth === -1) {
    relevantYear -= 1;
    lastMonth = 11;
  }

  const monthIncome = object.filter((obj) => {
    const date = new Date(obj.date);
    return date.getMonth() === lastMonth && date.getFullYear() === relevantYear;
  });

  return sumTotalIncome(monthIncome);
};

export const formatToUsd = (value) => {
  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return currency.format(value);
};

const incomeUtils = {
  sumTotalIncome,
  sumAverageIncome,
  sumLastMonthIncome,
  formatToUsd,
};

export default incomeUtils;
