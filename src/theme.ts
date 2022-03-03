import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  borderRadius: '4px',
  palette: {
    main: '#fefefe',
    contrastText: '#121212',
    hint: '#727272',
    primary: '#7B61FF',
    border: {
      default: '#dedfe6',
      focus: '#121212',
    },
    fail: '#ff5252',
    success: '#00d455',
    guide: {
      background: '#f2f3f5',
    },
  },
};

export const darkTheme: DefaultTheme = {
  borderRadius: '4px',
  palette: {
    main: '#fefefe',
    contrastText: '#121212',
    primary: '#7B61FF',
    hint: '#727272',
    border: {
      default: '#dedfe6',
      focus: '#121212',
    },
    fail: '#ff5252',
    success: '#00d455',
    guide: {
      background: '#f2f3f5',
    },
  },
};
