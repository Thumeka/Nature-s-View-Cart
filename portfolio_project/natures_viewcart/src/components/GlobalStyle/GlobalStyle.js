import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Arial, sans-serif;
  }

  nav {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    background-color: #333;
  }

  nav a {
    color: #fff;
    text-decoration: none;
    padding: 10px;
  }

  nav a:hover {
    background-color: #555;
  }

  @media (max-width: 768px) {
    nav {
      flex-direction: column;
    }

    nav a {
      padding: 15px;
    }
  }
`;

export default GlobalStyle;
