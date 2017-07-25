var database = require('../config/database.config');
var cita = {}

cita.selectAll = function(callback) {
  if(database) {
    database.query('SELECT * FROM Cita', function(error, resultados) {
      if(error) throw error;
      callback(resultados);
    });
  }
}


cita.insert = function(data, callback){
  if(database){
    database.query("Call SP_insertCita(?,?,?,?,?)",
      [data.fecha, data.lugar, data.asunto, data.idContacto, data.detalle], function(error, resultado){
        if(error){
          throw error;
        }else{
          callback(null, {"insertId": resultado.insertId});
        }
      });
  }
}


cita.delete = function(idCita, callback){
  if(database){
    var consulta = "Call SP_deleteCita(?)";
    database.query(consulta, idCita,
      function(error, resultado){
        if(error) {
        throw error;
      } else {
        callback(null, {"Mensaje": "Eliminado"});
      }
    });
  }
}
module.exports = cita;