let mysql = require('mysql2');

const express = require("express");
const cors = require('cors')
const app = express();
const port = 3000;

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'eventmanager'
});

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
app.use('/user', userRoutes);


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});