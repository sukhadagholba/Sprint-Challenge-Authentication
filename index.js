const express = require('express');
//const morgan = require('morgan');
const cors = require('cors');
const { server } = require('./server');
const app = express();

app.use(express.json());
//app.use(morgan('dev'));
app.use(cors());
app.use('/api', server);



//const port = process.env.PORT || 5000;




server.listen(4004, () => {
  console.log(`API listening on port 4004`);
});
