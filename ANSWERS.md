<!-- Answers to the Short Answer Essay Questions go here -->

1.  Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.
Middleware softwware is used to add additional functionality to an applciation. 

A session is a place to store data that you want access to across requests. Every user that visits a website has a unique session associated with that user. Sessions are used to store and access user data as they browse an application.

2.  What does bcrypt do in order to prevent attacks?
bcrypt by default incorporates a salt to protect against rainbow table attacks. It is an adaptive function that is over time, the iteration count can be increased to make it slower, so it remains resistant to brute-force search attacks even with increasing computation power.

3.  What are the three parts of the JSON Web Token?
Header, Body and Signature.
