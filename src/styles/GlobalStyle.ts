import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography.sizes.base};
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.backgroundAlt};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    cursor: pointer;
    font-family: ${theme.typography.fontFamily};
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.typography.weights.semibold};
    line-height: 1.2;
  }

  h1 {
    font-size: ${theme.typography.sizes['3xl']};
  }

  h2 {
    font-size: ${theme.typography.sizes['2xl']};
  }

  h3 {
    font-size: ${theme.typography.sizes.xl};
  }

  p {
    line-height: 1.5;
  }
`; 
