import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// Common
import GlobalStyle from './globalStyles';
import { lightTheme, darkTheme } from './theme';
import Header from './components/Header';

// Pages
import HomePage from './pages/Home';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login/index';

function App(): JSX.Element {
  const [theme, setTheme] = useState(lightTheme);
  const updateTheme: () => void = () => {
    if (theme === lightTheme) {
      setTheme(darkTheme);
      localStorage.setItem('theme', 'darkTheme');
    } else {
      setTheme(lightTheme);
      localStorage.setItem('theme', 'lightTheme');
    }
  };
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header toggleTheme={updateTheme} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
