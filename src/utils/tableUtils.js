export const formatString = (str) =>
  str.charAt(0).toUpperCase() +
  str
    .slice(1)
    .split(/(?=[A-Z])/)
    .join(' ');

export const filterByValue = (items, value) => {
  const filteredValue = items.filter((item) => {
    return Object.keys(item).some((key) => {
      if (typeof item[key] === 'string') {
        return item[key].toLowerCase().includes(value.toLowerCase());
      }
      return null;
    });
  });

  return filteredValue;
};

export const nextSortDirection = (sortDirections, current) => {
  return sortDirections[sortDirections.indexOf(current) + 1];
};

const tableUtils = {
  formatString,
  filterByValue,
  nextSortDirection,
};

export default tableUtils;
