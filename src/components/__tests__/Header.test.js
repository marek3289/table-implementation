import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from 'utils/testUtils';
import { Header } from 'components';
import { Input } from 'styles';

const setup = () => {
  const setPostPerPage = jest.fn();
  const setSearchInput = jest.fn();

  const utils = render(
    <Header
      setPostPerPage={setPostPerPage}
      searchInput=""
      setSearchInput={setSearchInput}
    />,
  );
  const header = utils.getByText(/show/i);
  return {
    header,
    ...utils,
  };
};

describe('Header component', () => {
  it('renders header component', () => {
    const { header } = setup();

    expect(header).toBeInTheDocument();
  });
  it('simulates selection', () => {
    const { getByTestId, getAllByTestId } = setup();

    const select = getByTestId('select');
    const options = getAllByTestId('select-option');

    fireEvent.change(select, { target: { value: 10 } });

    expect(options[0].selected).toBeTruthy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeFalsy();
    expect(options[3].selected).toBeFalsy();

    fireEvent.change(select, { target: { value: 50 } });
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeTruthy();
    expect(options[3].selected).toBeFalsy();
  });
  it('renders search bar input', () => {
    const { getByPlaceholderText } = setup();
    expect(getByPlaceholderText('Search')).toBeInTheDocument();
  });
  it('handleSearch is called on change', () => {
    const placeholderText = 'Search';
    const handleSearch = jest.fn();

    const { getByPlaceholderText } = render(
      <Input placeholder={placeholderText} onChange={handleSearch} />,
    );
    const input = getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'a' } });
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });
  it('get new value on change', () => {
    const placeholderText = 'Search';

    const { getByPlaceholderText } = render(
      <Input placeholder={placeholderText} />,
    );
    const input = getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'Test' } });
    expect(input).toHaveValue('Test');
  });
});
