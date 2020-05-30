import { formatString } from 'utils/tableUtils';

describe('table utils tests', () => {
  it('get valid formatted string', () => {
    const string = 'testTestTest';
    expect(formatString(string)).toBe('Test Test Test');
  });
});
