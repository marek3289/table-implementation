import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TableLayout, Cell, Row, Pagination } from 'components';
import { usePagination, useSorter } from 'hooks';
import { mixins, Paragraph } from 'styles';
import { constants, tableUtils } from 'utils';

const StyledCellsRow = styled.tr`
  background-color: ${({ theme }) => theme.gray200};
  & > th:first-child {
    width: 50px;
  }
  & > th {
    transition: ${({ theme }) => theme.cellTransition};
    :hover {
      background-color: ${({ theme }) => theme.gray100};
      cursor: pointer;
    }
  }
`;

const StyledFooter = styled.footer`
  ${mixins.flexBetween};
  width: 100%;
  margin: 10px 0;
`;

const DataTable = ({ companies, currentPage, postPerPage }) => {
  const [activeCol, setActiveCol] = useState('');
  const [activeDir, setActvieDir] = useState('');
  const { sortedList } = useSorter(companies, activeCol, activeDir);

  const { itemList } = usePagination(sortedList, currentPage, postPerPage);
  const firstInOrder = postPerPage * currentPage - postPerPage + 1;
  const lastInOrder = postPerPage * currentPage;
  const fullLength = companies.length;

  const { formatString, nextSortDirection } = tableUtils;
  const { headings, sortingTypes } = constants;

  const handleSorting = (e) => {
    const getValue = e.target.closest('th').querySelector('span').attributes
      .name.value;

    if (getValue !== activeCol) {
      setActiveCol(getValue);
      setActvieDir('asc');
    } else {
      const dir = nextSortDirection(sortingTypes, activeDir);
      setActvieDir(dir);
    }
  };

  return (
    <>
      <TableLayout>
        <thead>
          <StyledCellsRow>
            {headings.map((heading) => {
              const newHeading = formatString(heading);
              return (
                <Cell
                  sorter={heading !== 'id'}
                  fixed={heading === 'id'}
                  key={heading}
                  type="th"
                  scope="col"
                  name={heading}
                  handleSorting={handleSorting}
                  activeCol={activeCol}
                  activeDir={activeDir}
                >
                  {newHeading}
                </Cell>
              );
            })}
          </StyledCellsRow>
        </thead>
        <tbody>
          {itemList.map((item) => (
            <Row
              data-testid="single-company"
              key={item.id}
              item={item}
              length={headings.length}
            />
          ))}
        </tbody>
      </TableLayout>
      <StyledFooter>
        <Paragraph>
          Showing {firstInOrder} to {lastInOrder} of {fullLength} entries
        </Paragraph>
        <Pagination
          currentPage={currentPage}
          totalItems={fullLength}
          postPerPage={postPerPage}
        />
      </StyledFooter>
    </>
  );
};

DataTable.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentPage: PropTypes.number.isRequired,
  postPerPage: PropTypes.number.isRequired,
};

export default DataTable;
