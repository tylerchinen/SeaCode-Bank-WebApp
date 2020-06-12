import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar'
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard'
import AdminDashboard from './components/AdminDashboard'
import Deposit from './components/Deposit'
import Withdraw from './components/Withdraw'
import Wire from './components/Wire'
import PublicDisclosure from './components/PublicDisclosure'



function App() {
  return (
    <Router>
      <Navbar />
      <Route path='/' exact component={Home} />
      <Route path='/publicdisclosure' exact component={PublicDisclosure} />
      <Route path='/signin'  component={SignIn} />
      <Route path='/signup'  component={SignUp} />
      <Route path='/dashboard'  component={Dashboard} />
      <Route path='/adashboard'  component={AdminDashboard} />
      <Route path='/dashboard/deposit'  component={Deposit} />
      <Route path='/dashboard/withdraw'  component={Withdraw} />
      <Route path='/dashboard/wire'  component={Wire} />
    </Router>
  );
}

export default App;
