var mysql = require('mysql');
var parametros =  {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'IONIC'
}
var connection = mysql.createConnection(parametros);

module.exports = connection;
