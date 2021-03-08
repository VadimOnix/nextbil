import { DefaultTheme } from 'styled-components';

export const mainTheme: DefaultTheme = {
  palette: {
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
    text: {
      disabled: '',
      error: '#E82828',
      primary: '#222222',
      secondary: '#A2A2A2',
    },
    primary: {
      contrastText: '#FFFFFF',
      main: '#0094FF',
    },
    background: {
      default: '#FFFFFF',
      input: '#F5F8FA'
    },
    action: {
      disabled: '#A2A2A2',
    }
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontSizeHtml: 16,
    fontWeightBold: 700,
    fontWeightRegular: 400,
    lineHeight: 17
  },
  shape: {
    borderRadius: '8px',
  },
  zIndex: {
    dropDown: 100,
  }
};