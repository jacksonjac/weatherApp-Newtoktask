const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', 
  port: 3306,        
  user: 'root',
  password: '7356',
  database: 'sample'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database.');
});

module.exports = connection;
