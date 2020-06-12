import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';


function App() {
  return (
    <Router>
      <Navbar />
      <Route path='/' exact component={Home} />
      <Route path='/signin' exact component={SignIn} />
      <Route path='/signup' exact component={SignUp} />
      <Route path='/dashboard' exact component={Dashboard} />
      <Route path='/adashboard' exact component={AdminDashboard} />
    </Router>
  );
}

export default App;
