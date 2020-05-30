import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { mixins, Input, Paragraph } from 'styles';
import { constants } from 'utils';

const StyledWrapper = styled.header`
  ${mixins.flexBetween}
  width: 100%;
`;

const StyledSelectWrapper = styled.div`
  ${mixins.alignCenter}

  & > p {
    padding: 0 10px;
    :first-child {
      padding-left: 0;
    }
  }
`;

const StyledSelect = styled.select`
  font-size: ${({ theme }) => theme.fontSize.s};
  width: 50px;
  height: 25px;
`;

const Header = ({ setPostPerPage, searchInput, setSearchInput }) => {
  const handleSearch = (e) => setSearchInput(e.target.value);
  const handleSelect = (e) => setPostPerPage(parseInt(e.target.value, 10));

  return (
    <StyledWrapper>
      <StyledSelectWrapper>
        <Paragraph>Show</Paragraph>
        <StyledSelect onChange={handleSelect}>
          {constants.itemsPerPage.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </StyledSelect>
        <Paragraph>entries</Paragraph>
      </StyledSelectWrapper>
      <Input placeholder="Search" value={searchInput} onChange={handleSearch} />
    </StyledWrapper>
  );
};

Header.propTypes = {
  setPostPerPage: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
  setSearchInput: PropTypes.func.isRequired,
};

export default Header;
