import logo from './logo.svg';
import './App.css';
import SideBar from './components/SideBar';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <SideBar />
      </Router>
    </div>
  );
}

export default App;
