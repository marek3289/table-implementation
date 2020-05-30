import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Cell } from 'components';
import { mixins } from 'styles';
import { useAxios } from 'hooks';
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
  const { id } = item;

  const { fetchedItems } = useAxios(
    `${process.env.REACT_APP_API_INCOME}/${id}`,
  );
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const { incomes } = fetchedItems;
    const {
      sumTotalIncome,
      sumAverageIncome,
      sumLastMonthIncome,
    } = incomeUtils;

    if (incomes) {
      const values = {
        totalIncome: sumTotalIncome(incomes),
        averageIncome: sumAverageIncome(incomes),
        lastMonthIncome: sumLastMonthIncome(incomes),
      };

      setEntries({ ...item, ...values });
      setLoading(false);
    }
  }, [fetchedItems, item]);

  return (
    <StyledRow>
      {loading ? (
        <StyledTableData colSpan={length}>
          <StyledLoading>Loading Entries...</StyledLoading>
        </StyledTableData>
      ) : (
        <>
          {headings.map((heading) => {
            const value = entries[heading];

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
