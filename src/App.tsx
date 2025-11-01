import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { initializeAuth } from './services/api';

const App: React.FC = () => {
  useEffect(() => {
    initializeAuth(); // Initialize auth header on app load
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;