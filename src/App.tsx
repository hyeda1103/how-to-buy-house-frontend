import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// Routes
import PrivateRoute from './routes/privateRoute';
import AdminRoute from './routes/adminRoute';

// Common
import GlobalStyle from './globalStyles';
import { lightTheme, darkTheme } from './theme';
import Header from './components/organisms/header';

// Pages
import HomePage from './components/pages/home';
import RegisterPage from './components/pages/register';
import LoginPage from './components/pages/login';
import AddCategoryPage from './components/pages/addCategory';
import CategoryListPage from './components/pages/categoryList';
import UpdateCategoryPage from './components/pages/updateCategory';
import ProfilePage from './components/pages/profile/index';
import CreatePostPage from './components/pages/createPost/index';

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
          <PrivateRoute exact path="/profile" component={ProfilePage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <AdminRoute exact path="/add-category" component={AddCategoryPage} />
          <AdminRoute exact path="/update-category/:id" component={UpdateCategoryPage} />
          <AdminRoute exact path="/category-list" component={CategoryListPage} />
          <AdminRoute exact path="/create-post" component={CreatePostPage} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
