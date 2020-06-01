import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { DataTable, Header } from 'components';
import { mixins } from 'styles';
import { tableUtils, incomeUtils } from 'utils';

const StyledWrapper = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  width: 90%;
`;

const App = ({ match }) => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const results = [];

    const {
      sumTotalIncome,
      sumAverageIncome,
      sumLastMonthIncome,
    } = incomeUtils;

    const { CancelToken } = axios;
    const source = CancelToken.source();

    const fetchItems = async () => {
      try {
        const { data } = await axios.get(process.env.REACT_APP_API_COMPANIES, {
          cancelToken: source.token,
        });
        data.forEach(async (company) => {
          const record = await axios.get(
            `${process.env.REACT_APP_API_INCOME}/${company.id}`,
          );
          const { incomes } = record.data;

          const totalIncome = sumTotalIncome(incomes);
          const averageIncome = sumAverageIncome(incomes);
          const lastMonthIncome = sumLastMonthIncome(incomes);

          results.push({
            ...company,
            totalIncome,
            averageIncome,
            lastMonthIncome,
          });
          const copyResultList = [...results];
          setCompanies(copyResultList);
        });
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        throw err;
      }
    };

    fetchItems();
  }, []);

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
          companies={filterByValue(companies, searchInput)}
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
