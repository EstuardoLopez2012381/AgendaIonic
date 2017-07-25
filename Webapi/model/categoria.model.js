var database = require("../config/database.config");
var Categoria = {};

Categoria.select = function(callback) {
  if(database) {
		database.query('SELECT * FROM Categoria', function(error, resultados){
			if(error) {
				throw error;
			} else {
				callback(resultados);
			}
		});
	}
}

Categoria.find = function(idCategoria, callback) {
  if(database) {
		database.query('SELECT * FROM Categoria WHERE idCategoria=?', idCategoria, function(error, resultados){
			if(error) {
				throw error;
			} else {
				callback(resultados);
			}
		});
	}
}

Categoria.insert = function(data, callback) {
  if(database) {
    var consulta = "CALL SP_insertCategoria(?)";
    database.query(consulta, data.nombreCa, function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });
  }
}



Categoria.delete = function(idCategoria, callback) {
  if(database) {
    var sql = "Call SP_deleteCategoria(?)";
    database.query(sql, idCategoria,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"Mensaje": "Eliminado"});
      }
    });
  }
}

module.exports = Categoria;
