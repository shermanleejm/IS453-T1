import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import AdminPage from './components/pages/AdminPage';
import AmountPage from './components/pages/AmountPage';
import ApplicationForm from './components/forms/ApplicationForm';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/admin">
            <AdminPage />
          </Route>
          <Route path="/loan_amount">
            <AmountPage />
          </Route>
          <Route path="/application">
            <ApplicationForm tab={0} />
          </Route>
          <Route path="/credit_score">
            <ApplicationForm tab={1} />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
