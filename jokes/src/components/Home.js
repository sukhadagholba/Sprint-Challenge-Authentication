import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Home extends React.Component {


 render() {
    return (
      <div>
        <div>
                <h1>Welcome</h1><br />
                <Link to="/api/register">Register</Link><br /><br />
                <Link to="/api/login">Login</Link>
           </div>
      </div>
    );
  }

}

export default Home;
