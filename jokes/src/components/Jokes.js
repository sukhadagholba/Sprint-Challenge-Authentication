import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Jokes extends React.Component {

constructor(){
        super();

        this.state= {
                jokes:[],
                logout: false,
        };

}


componentDidMount() {

        const token = localStorage.getItem('jwt');
        const requestOptions={
                headers:{
                        Authorization: token
                }
        }

        axios.get('http://localhost:4004/api/jokes', requestOptions)

        .then(res =>{
        this.setState({jokes: res.data});
        })

        .catch(err =>{
		console.log("error: couldn't get the users");
        });

};

logoutHandler = event =>{
        localStorage.removeItem('jwt');
        this.setState({users:[], logout: true});
};


render() {
    return (<div>
            {this.state.logout ?
                (<div>
                <h1>You are successfully logged out...</h1>
                <Link to="/">Login</Link><br /><br />
                </div>) :(
      <div><h2>Jokes</h2>
        {this.state.jokes.map(joke => {return <div key={Math.random()}><p>{joke.setup}</p><p>{joke.punchline}</p></div>}
        )}

        <button onClick={this.logoutHandler}>Logout</button>
     </div>
                )}
    </div>);
  }
}

export default Jokes;
