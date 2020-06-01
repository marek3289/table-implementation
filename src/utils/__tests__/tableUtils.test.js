import { constants } from 'utils';
import {
  formatString,
  filterByValue,
  nextSortDirection,
} from 'utils/tableUtils';

describe('table utils tests', () => {
  it('get valid formatted string', () => {
    const string = 'testTestTest';
    expect(formatString(string)).toBe('Test Test Test');
  });
  it('returns array of all objects which includes word from string', () => {
    const tableOfObjects = [
      { key: 'one', key2: 'abc' },
      { key: 'two', key2: 'def' },
      { key: 'three', key2: 'ghi' },
    ];

    expect(filterByValue(tableOfObjects, 'one')).toEqual([
      { key: 'one', key2: 'abc' },
    ]);
  });
  it('returns valid objects ignoring letter case', () => {
    const tableOfObjects = [{ key: 'one' }, { key: 'ONE' }, { key: 'OnE' }];

    expect(filterByValue(tableOfObjects, 'one')).toEqual([
      { key: 'one' },
      { key: 'ONE' },
      { key: 'OnE' },
    ]);
  });
  it('return next sorting type', () => {
    const { sortingTypes } = constants;
    let currentType = '';
    expect(nextSortDirection(sortingTypes, currentType)).toBe('asc');

    currentType = 'asc';
    expect(nextSortDirection(sortingTypes, currentType)).toBe('desc');

    currentType = 'desc';
    expect(nextSortDirection(sortingTypes, currentType)).toBeUndefined();
  });
  it('returns sorting by ascending while current is undefined ', () => {
    const { sortingTypes } = constants;

    const currentType = undefined;
    expect(nextSortDirection(sortingTypes, currentType)).toBe('asc');
  });
});
