import React from 'react';
import { render } from 'utils/testUtils';
import { DataTable } from 'components';

const setup = () => {
  const fakeCompanies = [
    { id: 1, name: 'aa', city: 'cc' },
    { id: 2, name: 'bb', city: 'aa' },
    { id: 3, name: 'cc', city: 'bb' },
  ];

  const utils = render(
    <DataTable companies={fakeCompanies} currentPage={1} postPerPage={10} />,
  );
  const table = utils.container.querySelector('table');
  return {
    table,
    ...utils,
  };
};

describe('DataTable component', () => {
  it('renders table component', () => {
    const { table } = setup();
    expect(table).toBeInTheDocument();
  });
});
