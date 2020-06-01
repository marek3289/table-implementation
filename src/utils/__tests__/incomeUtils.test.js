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

    incomes = [{ value: '12', val: '6' }];
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
  it('get sum of all values from object', () => {
    let incomes = [{ value: '3' }, { value: '3' }];
    expect(sumTotalIncome(incomes)).toBe(6);

    incomes = [{ value: 3 }, { value: '7' }];
    expect(sumTotalIncome(incomes)).toBe(10);
  });
  it('get average sum from all values', () => {
    let incomes = [{ value: '3' }, { value: '3' }];
    expect(sumAverageIncome(incomes)).toBe(3);

    incomes = [{ value: 3 }];
    expect(sumAverageIncome(incomes)).toBe(3);

    incomes = [{ value: 10 }, { value: '20' }, { value: '10' }, { value: 20 }];
    expect(sumAverageIncome(incomes)).toBe(15);
  });
  it('get formatted income from previous month', () => {
    // mockDate also mocking incomes date, thats why test failing !!!

    // const mockDate = new Date('2020-05-01T22:10:33.249Z');
    // const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    let incomes = [
      { value: '20', date: '2020-05-01T22:10:33.249Z' },
      { value: '20', date: '2020-04-02T09:33:32.148Z' },
      { value: 20, date: '2020-06-05T07:39:27.872Z' },
    ];
    expect(sumLastMonthIncome(incomes)).toBe(20);

    incomes = [
      { value: '5', date: '2019-04-01T22:10:33.249Z' },
      { value: 10, date: '2021-04-29T16:38:55.265Z' },
    ];

    expect(sumLastMonthIncome(incomes)).toBe(0);
    // spy.mockRestore();
  });
});
