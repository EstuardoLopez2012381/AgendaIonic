var database = require("../config/database.config");
var Contacto = {};

Contacto.selectAll = function(callback) {
  if(database) {
    database.query('SELECT * FROM vistaContacto', function(error, resultados) {
      if(error) throw error;
      callback(resultados);
    });
  }
}

Contacto.insert = function(data, callback){
  if(database){
    database.query("Call SP_insertContacto(?,?,?,?,?,?)",
      [data.nombreCo, data.apellido, data.direccion, data.telefono, data.correo, data.idCategoria, data.idUsuario], function(error, resultado){
        if(error){
          throw error;
        }else{
          callback(null, {"insertId": resultado.insertId});
        }
      });
  }
}


Contacto.delete = function(idContacto, callback){
  if(database){
    var consulta = "Call SP_deleteContacto(?)";
    database.query(consulta, idContacto,
      function(error, resultado){
        if(error) {
        throw error;
      } else {
        callback(null, {"Mensaje": "Eliminado"});
      }
    });
  }
}

module.exports = Contacto;
