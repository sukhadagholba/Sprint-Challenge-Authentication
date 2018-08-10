import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
//import SignIn from './components/SignIn';
//import UsersList from './components/UsersList';
import SignUp from './components/SignUp';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Jokes from './components/Jokes';



class App extends Component {
  render() {
    return (
      <div className="App">
      
	<Route exact path="/" component ={Home} />
        <Route exact path="/api/register" component={SignUp} />
	<Route exact path="/api/login" component={SignIn} /><br /><br />
	<Route exact path="/api/jokes" component={Jokes} /><br /><br />    
	</div>
    );
  }
}

export default App;
