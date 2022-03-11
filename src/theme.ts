import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  borderRadius: '100px',
  palette: {
    main: '#ffffff',
    contrastText: '#202125',
    hint: '#727272',
    primary: '#4E75D9',
    hover: '#3C48C9',
    border: {
      default: '#dedfe6',
      focus: '#202125',
    },
    nav: {
      item: '#202125',
    },
    dropdown: {
      value: '#202125',
      option: '#757575',
      hover: '#f2f3f5',
      focus: '#3C48C9',
    },
    fail: '#ff5252',
    success: '#00d455',
    guide: {
      background: '#f2f3f5',
    },
  },
};

export const darkTheme: DefaultTheme = {
  borderRadius: '100px',
  palette: {
    main: '#fefefe',
    contrastText: '#121212',
    primary: '#7B61FF',
    hover: '#493892',
    hint: '#727272',
    border: {
      default: '#dedfe6',
      focus: '#121212',
    },
    dropdown: {
      value: '#202125',
      option: '#757575',
      hover: '#f2f3f5',
      focus: '#3C48C9',
    },
    nav: {
      item: '#202125',
    },
    fail: '#ff5252',
    success: '#00d455',
    guide: {
      background: '#f2f3f5',
    },
  },
};
