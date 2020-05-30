import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { mixins, Button } from 'styles';
import { ReactComponent as AngleRight } from 'assets/icons/angle-right.svg';

const StyledWrapper = styled.ul`
  ${mixins.alignCenter}
  & > li {
    margin: 0 5px;
  }
`;

const StyledAngleRight = styled(AngleRight)`
  width: 7.5px;
  transform: ${({ theme, rotate }) => rotate === -1 && theme.rotate};
`;

const Pagination = ({ currentPage, totalItems, postPerPage }) => {
  const pageNumbers = Array(Math.ceil(totalItems / postPerPage))
    .fill()
    .map((_, i) => i + 1);

  return (
    <StyledWrapper>
      {pageNumbers.length > 1 &&
        pageNumbers.map((num) => {
          const nextPage = currentPage > num ? -1 : +1;

          if (num === currentPage - 1 || num === currentPage + 1)
            return (
              <li key={num}>
                <Button as={Link} to={`/page/${currentPage + nextPage}`}>
                  <StyledAngleRight rotate={nextPage} />
                </Button>
              </li>
            );

          if (currentPage === num)
            return (
              <li key={num}>
                <Button disabled>{num}</Button>
              </li>
            );

          return null;
        })}
    </StyledWrapper>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  postPerPage: PropTypes.number.isRequired,
};

export default Pagination;
