export const homeRoute = '/';
export const pageRoute = '/page/:id';

export const itemsPerPage = [10, 25, 50, 100];

const tableHeadings = {
  id: 'id',
  name: 'name',
  city: 'city',
  totalIncome: 'totalIncome',
  averageIncome: 'averageIncome',
  lastMonthIncome: 'lastMonthIncome',
};

const sortBy = {
  asc: 'asc',
  desc: 'desc',
};

export const headings = Object.keys(tableHeadings);
export const sortingTypes = Object.keys(sortBy);

const constants = {
  headings,
  sortingTypes,
  homeRoute,
  pageRoute,
  itemsPerPage,
};

export default constants;
