import {
  getValues,
  formatToUsd,
  sumTotalIncome,
  sumAverageIncome,
  sumLastMonthIncome,
} from 'utils/incomeUtils';

describe('income utils tests', () => {
  it('geting array of values from object', () => {
    let incomes = [{ value: '3' }, { value: '3' }];
    expect(getValues(incomes)).toEqual(['3', '3']);

    incomes = [{ value: '12' }];
    expect(getValues(incomes)).toEqual(['12']);
  });
  it('format number value to USD', () => {
    let value = 3;
    expect(formatToUsd(value)).toBe('$3.00');

    value = 19.02;
    expect(formatToUsd(value)).toBe('$19.02');

    value = 274715;
    expect(formatToUsd(value)).toBe('$274,715.00');
  });
  it('format string value to USD', () => {
    let value = '3';
    expect(formatToUsd(value)).toBe('$3.00');

    value = '274715';
    expect(formatToUsd(value)).toBe('$274,715.00');
  });
  it('get total formatted income from all values from object', () => {
    let incomes = [{ value: '3' }, { value: '3' }];
    expect(sumTotalIncome(incomes)).toBe('$6.00');

    incomes = [{ value: 3 }, { value: '7' }];
    expect(sumTotalIncome(incomes)).toBe('$10.00');
  });
  it('get average formatted income from all values', () => {
    let incomes = [{ value: '3' }, { value: '3' }];
    expect(sumAverageIncome(incomes)).toBe('$3.00');

    incomes = [{ value: 3 }];
    expect(sumAverageIncome(incomes)).toBe('$3.00');

    incomes = [{ value: 10 }, { value: '20' }, { value: '10' }, { value: 20 }];
    expect(sumAverageIncome(incomes)).toBe('$15.00');
  });
  it('get formatted income from previous month', () => {
    // do tests with mocked new Date();   !!!

    // const mockedDate = new Date(2020, 2, 2)
    // jest.spyOn(Date.prototype, 'Date').and.returnValue(mockedDate);

    let incomes = [
      { value: '20', date: '2020-04-01T22:10:33.249Z' },
      { value: 20, date: '2020-05-29T16:38:55.265Z' },
      { value: '20', date: '2020-04-02T09:33:32.148Z' },
      { value: 20, date: '2020-03-05T07:39:27.872Z' },
    ];
    expect(sumLastMonthIncome(incomes)).toBe('$40.00');

    incomes = [
      { value: '5', date: '2019-04-01T22:10:33.249Z' },
      { value: 10, date: '2021-04-29T16:38:55.265Z' },
    ];

    expect(sumLastMonthIncome(incomes)).toBe('$0.00');
  });
});
