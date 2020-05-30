import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableWrapper = styled.div`
  width: 100%;

  @media only screen and (max-width: 700px) {
    position: relative;
  }
`;

const ScrollContainer = styled.div`
  width: inherit;

  @media only screen and (max-width: 700px) {
    overflow-x: auto;
    margin-left: 50px;

    & > table {
      width: calc(100% - 50px);
    }
  }
`;

const StyledTable = styled.table`
  font-size: ${({ theme }) => theme.fontSize.m};
  table-layout: fixed;
  border-spacing: 0;
  empty-cells: show;
  margin: 10px 0;
  min-width: 600px;
  & > tfoot {
    border: none;
  }
  width: 100%;

  @media only screen and (max-width: 700px) {
    table-layout: auto;
  }
`;

const TableLayout = ({ children }) => (
  <TableWrapper>
    <ScrollContainer>
      <StyledTable>{children}</StyledTable>
    </ScrollContainer>
  </TableWrapper>
);

TableLayout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableLayout;
