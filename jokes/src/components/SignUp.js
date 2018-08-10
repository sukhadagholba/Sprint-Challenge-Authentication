import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class SignUp extends React.Component {

constructor(){
        super();

        this.state= {
                username:"",
                password:"",
                logged: false,
        };

}

changeHandler = event =>{
        this.setState({[event.target.name]: event.target.value});
};


registerHandler =event =>{

        event.preventDefault();
        const {username, password} = this.state;
        const user = {username, password};

        axios.post('http://localhost:4004/api/register', user)

        .then(res =>{
		const token = res.data;
        localStorage.setItem('jwt', token);
        this.setState({username: "", password: "", logged: true});
        })

        .catch(err =>{
        console.log("error: couldn't login");

        });

};


logoutHandler = event =>{
        localStorage.removeItem('jwt');
        this.setState({logged: false});

};



 render() {
    return (
      <div>
        {this.state.logged ?
                (<div>
                <h1>Welcome have successfully created a new account</h1>
                <Link to="/api/jokes">View Jokes</Link><br /><br />
                <button onClick={this.logoutHandler}>Logout</button>

                </div>) :(
<div>
        <h2>SignUp</h2>
        <form onSubmit={this.registerHandler}>
        <input type="text" placeholder="username" onChange={this.changeHandler} name="username" value={this.state.username}/><br />
        <input type="password" placeholder="password" onChange={this.changeHandler} name="password" value={this.state.password}/><br /><br />
        <button type="submit">Submit</button>
        </form>
        </div>
        )}
     </div>
    );
  }

}

export default SignUp;
