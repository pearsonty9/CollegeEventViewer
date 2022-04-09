let mysql = require('mysql2');

const express = require("express");
const cors = require('cors')
const config = require('./config');
const app = express();
const port = 3000;

let connection = mysql.createConnection(config.db);

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to MySQL server.');
});

app.use(cors())
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');
const RSORoutes = require('./routes/rsos');

app.use('/user', userRoutes);
app.use('/event', eventRoutes);
app.use('/rso', RSORoutes);


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});