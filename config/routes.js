const express = require('express');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const server = express.Router();
const {authenticate } = require('./middlewares');
const db = require('../database/dbConfig');
const jwt = require('jsonwebtoken');
const jwtKey = require('../_secrets/keys').jwtKey;

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
                const token = generateToken(user);

                res.send(token);
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

const credentials = req.body;

  db('users')
    .where({ username: credentials.username })
    .first()
    .then(function(user) {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {

        const token = generateToken(user);

        //token attached to the response

	res.send(token);
      } else {
        return res.status(401).json({ error: 'Incorrect credentials' });
      }
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
}

const secret = jwtKey;                
	
function generateToken(user) {
  const payload = {
          sub: user.id,
  };

  const options = {
    expiresIn: '2h',
    jwtid: 'u97487291555',
  };

  return jwt.sign(payload, secret, options);
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
