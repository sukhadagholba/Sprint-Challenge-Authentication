const express = require('express');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const server = express.Router();
const { authenticate } = require('./middlewares');
const db = require('../database/dbConfig');



module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
	
if(!req.body.username || !req.body.password){
        res.status(401).json({message: 'Please do not leave any fields empty. Provide a username and password'});
        }

        else{
        const credentials = req.body;
        const hash = bcrypt.hashSync(credentials.password, 14);  //hasing password using bcrypt
        credentials.password = hash;


        db('users')
        .insert(credentials)

        .then(ids =>{

                db('users')
                .where('id', ids[0])
                .first()
                .then(user => {
		let userCreated = {};
	        userCreated={id: user.id, username: user.username};
                //const token = generateToken(user);

                res.status(200).json(userCreated);
                })
        })

        .catch(err =>{
        if(err.message.includes('UNIQUE constraint failed: users.username')) res.status(500).json({errorMessage:"username already taken, use another username"});  //checking if the username is alread taken

        else res.status(500).json(err);
        });

}      
}



function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
