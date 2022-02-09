import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// Common
import GlobalStyle from './globalStyles';
import { lightTheme, darkTheme } from './theme';
import Header from './components/organisms/header';

// Pages
import HomePage from './components/pages/home';
import RegisterPage from './components/pages/register';
import LoginPage from './components/pages/login';
import AddCategoryPage from './components/pages/addCategory';

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
          <Route exact path="/add-category" component={AddCategoryPage} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
