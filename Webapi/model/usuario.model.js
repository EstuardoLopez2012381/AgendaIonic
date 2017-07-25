var database = require("../config/database.config");
var usuario = {};

usuario.selectAll = function(callback) {
  if(database) {
    database.query('SELECT * FROM Usuario', function(error, resultados) {
      if(error) throw error;
      callback(resultados);
    });
  }
}

usuario.insert = function(data, callback) {
	if(database){
		database.query("CALL SP_insertUsuario(?,?)", [data.nick, data.contrasena], function (error, resultado) {
			if(error){
				throw error;
			} else {
				callback({"affectedRows": resultado.affectedRows})
			}
		});
	}
}



usuario.delete = function (idUsuario, callback) {
	if(database){
		var sql = "DELETE FROM Usuario WHERE idUsuario = ?";
		database.query(sql, idUsuario, function (error, resultado) {
			if(error){
				throw error;
			} else{
				callback(null, {"Mensaje" : "Se ha eliminado"});
			}
		}); 
	}
}

usuario.autenticar = function(data, callback) {
  if(database) {
    var sql = "SELECT * FROM Usuario WHERE nick = ? AND contrasena = ?";
    database.query(sql, [data.nick, data.contrasena],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });
  }
}

module.exports = usuario;
