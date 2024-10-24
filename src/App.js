import React from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Navbar from './navbar';
import Home from './home/home';
import BlogCreate from './create';
import BlogDetail from './blogDetail';
import NotFound from './notfound';
import LandingPage from './home/LandingPage';
import SignInForm from './auth/SignInForm';
import Dashboard from './user/dashboard';
import AddPost from './user/addPost';
import BlogView from './user/BlogView';
import EditForm from './user/EditForm';
import Register from './auth/Register';

function AppContent() {
  // Get the current location
  const location = useLocation();

  // Determine if we are on the home page or not
  const isHome = location.pathname === '/';

  return (
    <div className="App">
      {/* Render Navbar only if we are on the home page */}
      {isHome && <Navbar />}
      
      <div className="content">
        <Switch>
          <Route exact path='/'>
            <Home />
            <LandingPage />
          </Route>
          
          <Route exact path='/signIn'>
            <SignInForm />
          </Route>

          <Route exact path='/register'>
            <Register />
          </Route>
          
          <Route path='/dashboard/:user'>
            <Dashboard />
          </Route>

          <Route exact path='/addpost/:user'>
            <AddPost />
          </Route>

          <Route exact path='/blog/:id'>
            <BlogView />
          </Route>

          <Route exact path='/edit/:id'>
            <EditForm />
          </Route>

          <Route path= '*'>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
