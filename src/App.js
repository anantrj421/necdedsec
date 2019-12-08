import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Form from './components/user/Form'
import Home from './components/user/Home'
import Login from './components/auth/Login'
import Dashboard from './components/user/Dashboard'
import Navb from './components/user/Navb'
import Store from './components/store/Store'
import Prod from './components/store/Prod'
import Update from './components/user/Update'
import Suggest from './components/solution/Suggest'
import Expert from './components/solution/Expert';
import Report from './components/user/Report';
import Share from './components/solution/Share'
function App() {
  return (
    <Router>
      <Navb></Navb>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/dashboard' component={Dashboard}></Route>
        <Route exact path='/form' component={Form}></Route>
        <Route exact path='/store' component={Store}></Route>
        <Route exact path='/prod' component={Prod}></Route>
        <Route exact path='/suggest' component={Suggest}></Route>
        <Route exact path='/expert' component={Expert}></Route>
        <Route exact path='/report' component={Report}></Route>
        <Route exact path='/share' component={Share}></Route>
      </Switch>
    </Router>
  );
}

export default App;
