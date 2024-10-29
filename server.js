// Import our dependancies
const express = require('express')
const app = express()
const mysql = require('mysql2')
const dotenv = require('dotenv')
const { config } = require('nodemon')
const { connect } = require('http2')
const PORT = 3000;


// configure evironment variables
dotenv.config()

//create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

//Test the connection
db.connect((err) => {
    // connection is not successful
    if(err) {
        return console.log("Error connecting to the database: ", err)
    }

    // connection is successful
    console.log("succesfully connected to Mysql: ", db.threadId)
})



// Middleware
app.use(express.json());

// Routes for CRUD operations

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Retrieve all patients
app.get('', (req, res) => {
    const getPatients = "SELECT * FROM patients" 
    db.query(getPatients, (error, results) => {
      if (error) {
        res.status(500).send('Error retrieving patients');
      } else {
        res.json(results);
      }
    });
  });

// Retrieve all providers
app.get('', (req, res) => {
  const getProviders = "SELECT * FROM providers" 
  db.query(getProviders, (error, results) => {
    if (error) {
      res.status(500).send('Error retrieving providers');
    } else {
      res.json(results);
    }
  });
});


//Filter patients by First Name

app.get('', (req, res) => {
  const FirstName = req.query.FirstName;
  const getFirstName = "SELECT * FROM patients WHERE first_name = ?";
  db.query(getFirstName, [FirstName], (error, results) => {
    if (error) {
      res.status(500).send('Error filtering patients by first name');
    } else {
      res.json(results);
    }
  });
});

//filter all providers by specialist 

app.get('/providers/specialty/:specialty', (req, res) => {
  const specialty = req.params.specialty;
  connection.query('SELECT * FROM providers WHERE provider_specialty = ?', [specialty], (error, results) => {
    if (error) {
      res.status(500).send('Error retrieving providers by specialty');
    } else {
      res.json(results);
    }
  });
});

