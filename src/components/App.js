import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import { DataTable, Header } from 'components';
import { mixins } from 'styles';
import { useAxios } from 'hooks';
import { tableUtils } from 'utils';

const StyledWrapper = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  width: 90%;
`;

const App = ({ match }) => {
  const { fetchedItems } = useAxios(process.env.REACT_APP_API_COMPANIES);

  const [postPerPage, setPostPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState('');
  const [redirect, setRedirect] = useState(false);

  const { id } = match.params;
  const currentPage = id ? parseInt(id, 10) : 1;
  const { filterByValue } = tableUtils;

  useEffect(() => {
    const parsedId = parseInt(id, 10);
    if (parsedId <= 1) setRedirect(true);
  }, [id]);

  return (
    <>
      {redirect && <Redirect to="/" />}
      <StyledWrapper>
        <Header
          postPerPage={postPerPage}
          setPostPerPage={setPostPerPage}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        <DataTable
          companies={filterByValue(fetchedItems, searchInput)}
          currentPage={currentPage}
          postPerPage={postPerPage}
        />
      </StyledWrapper>
    </>
  );
};

App.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default App;
