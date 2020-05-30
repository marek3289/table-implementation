import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { ReactComponent as CaretUp } from 'assets/icons/caret-up.svg';
import { mixins } from 'styles';

const StyledWrapper = styled.td`
  ${mixins.cellHeight};
  font-weight: ${({ theme, type }) =>
    type === 'th' ? theme.bold : theme.regular};
  border-bottom: ${({ theme }) => theme.defaultBorder}
    ${({ theme }) => theme.gray100};
  padding: 0 12px;
  text-align: left;
  line-height: 14px;

  :focus {
    outline: none;
    background-color: ${({ theme }) => theme.gray100};
  }

  @media only screen and (max-width: 700px) {
    ${({ fixed }) =>
      fixed &&
      css`
        ${mixins.alignCenter};
        position: absolute;
        top: auto;
        left: 0;
        width: 50px;
        background-color: ${({ theme, header }) =>
          header ? theme.gray200 : 'transparent'};
        white-space: unset;
        text-align: left;
        backface-visibility: hidden;
        border-right: ${({ theme }) => theme.defaultBorder}
          ${({ theme }) => theme.gray100};
        border-bottom: ${({ header }) => !header && 'none'};
      `}
  }
`;

const StyledSorters = styled.div`
  ${mixins.alignCenter};
  & > span:not(:first-child) {
    padding: 0 10px;
  }
`;

const StyledSpanImg = styled.span`
  display: block;
  height: 7.5px;
  width: 7.5px;
  line-height: 0;

  svg {
    margin-top: -2.5px;
    color: ${({ theme, active }) => active && theme.blue};
  }
  :last-child {
    transform: ${({ theme }) => theme.rotate};
  }
`;

const Cell = ({
  type: Wrapper,
  scope,
  children,
  sorter,
  name,
  handleSorting,
  activeCol,
  activeDir,
  fixed,
}) => {
  const isActive = name === activeCol;

  return (
    <>
      {sorter ? (
        <StyledWrapper
          as={Wrapper}
          scope={scope}
          type={Wrapper}
          onClick={handleSorting}
          header
          fixed={fixed}
          tabIndex="0"
        >
          <StyledSorters>
            <span name={name}>{children}</span>
            <span>
              <StyledSpanImg
                role="img"
                aria-label="caret-up"
                active={isActive && activeDir === 'asc'}
              >
                <CaretUp />
              </StyledSpanImg>
              <StyledSpanImg
                role="img"
                aria-label="caret-down"
                active={isActive && activeDir === 'desc'}
              >
                <CaretUp />
              </StyledSpanImg>
            </span>
          </StyledSorters>
        </StyledWrapper>
      ) : (
        <StyledWrapper
          as={Wrapper}
          scope={scope}
          type={Wrapper}
          header={name}
          fixed={fixed}
        >
          {children}
        </StyledWrapper>
      )}
    </>
  );
};

Cell.propTypes = {
  children: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  handleSorting: PropTypes.func,
  activeCol: PropTypes.string,
  activeDir: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  scope: PropTypes.string,
  sorter: PropTypes.bool,
  fixed: PropTypes.bool,
};

Cell.defaultProps = {
  handleSorting: null,
  activeDir: null,
  activeCol: null,
  name: '',
  type: 'td',
  scope: null,
  sorter: false,
  fixed: false,
};

export default Cell;
