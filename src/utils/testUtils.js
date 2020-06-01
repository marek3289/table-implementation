/* eslint-disable react/prop-types */

import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles';

const AllTheProviders = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const renderWithTheme = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export { renderWithTheme as render };
