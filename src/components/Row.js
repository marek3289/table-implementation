import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Cell } from 'components';
import { mixins } from 'styles';
import { incomeUtils, constants } from 'utils';

const StyledRow = styled.tr`
  transition: ${({ theme }) => theme.cellTransition};
  :nth-child(even) {
    background-color: ${({ theme }) => theme.lightBlue};
  }
  :hover {
    background-color: ${({ theme }) => theme.gray200};
  }
`;

const StyledTableData = styled.td`
  ${mixins.cellHeight};
`;

const StyledLoading = styled.div`
  ${mixins.flexCenter};
  font-weight: ${({ theme }) => theme.regular};
`;

const Row = ({ item, length }) => {
  const { headings } = constants;
  const { formatToUsd } = incomeUtils;

  return (
    <StyledRow>
      {!item ? (
        <StyledTableData colSpan={length}>
          <StyledLoading>Loading Entries...</StyledLoading>
        </StyledTableData>
      ) : (
        <>
          {headings.map((heading) => {
            const value = item[heading];

            if (typeof item[heading] === 'number' && heading !== 'id')
              return <Cell key={value}>{formatToUsd(value)}</Cell>;

            if (heading === 'id')
              return (
                <Cell key={value} type="th" scope="row" fixed>
                  {value}
                </Cell>
              );

            return <Cell key={value}>{value}</Cell>;
          })}
        </>
      )}
    </StyledRow>
  );
};

Row.propTypes = {
  item: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
  length: PropTypes.number.isRequired,
};

export default Row;
