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
import ProfilePage from './components/pages/profile';
import AccountVerifiedPage from './components/pages/accountVerified';
import UpdateProfilePage from './components/pages/updateProfile';
import UploadProfilePhotoPage from './components/pages/uploadProfilePhoto';
import RegisterPage from './components/pages/register';
import LoginPage from './components/pages/login';
import PasswordResetTokenPage from './components/pages/passwordResetToken/index';
import ResetPasswordPage from './components/pages/resetPassword';
import AddCategoryPage from './components/pages/addCategory';
import CategoryListPage from './components/pages/categoryList';
import UpdateCategoryPage from './components/pages/updateCategory';
import CreatePostPage from './components/pages/createPost';
import PostListPage from './components/pages/postList';
import PostDetailsPage from './components/pages/postDetails';
import UpdatePostPage from './components/pages/updatePost';

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
          <PrivateRoute exact path="/profile/:id" component={ProfilePage} />
          <PrivateRoute
            exact
            path="/upload-profile-photo"
            component={UploadProfilePhotoPage}
          />
          <PrivateRoute
            exact
            path="/verify-account/:token"
            component={AccountVerifiedPage}
          />
          <PrivateRoute
            exact
            path="/update-profile/:id"
            component={UpdateProfilePage}
          />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/password-reset-token" component={PasswordResetTokenPage} />
          <Route exact path="/reset-password/:token" component={ResetPasswordPage} />
          <Route exact path="/posts" component={PostListPage} />
          <Route exact path="/posts/:id" component={PostDetailsPage} />
          <AdminRoute exact path="/update-post/:id" component={UpdatePostPage} />
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
