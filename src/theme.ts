import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  borderRadius: '4px',
  palette: {
    common: {
      main: '#fefefe',
      contrastText: '#333333',
    },
    success: {
      main: '#dddddd',
      contrastText: '#6cc070',
    },
    fail: {
      main: '#fefefe',
      contrastText: '#E73339',
    },
  },
};

export const darkTheme: DefaultTheme = {
  borderRadius: '4px',
  palette: {
    common: {
      main: '#1C2128',
      contrastText: '#fefefe',
    },
    success: {
      main: '#6cc070',
      contrastText: '#dddddd',
    },
    fail: {
      main: '#fefefe',
      contrastText: '#E73339',
    },
  },
};
