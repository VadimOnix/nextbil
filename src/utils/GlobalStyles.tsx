import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyles = createGlobalStyle`
  html {
    font-size: ${(p) => p.theme.typography.fontSizeHtml ?? 18}px;
  }
  body {
    background-color: #102250;
    color: ${(p) => p.theme.palette.text.primary};
    font-family: ${(p) => p.theme.typography.fontFamily};
  }
  #root {
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 100vh;
    & > * {
      background-color: ${(p) => p.theme.palette.common.white}
    }
  }
`;

export default GlobalStyles;
