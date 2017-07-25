var database = require('../config/database.config');
var tarea = {}

tarea.selectAll = function(callback) {
  if(database) {
    database.query('SELECT * FROM Tarea', function(error, resultados) {
      if(error) throw error;
      callback(resultados);
    });
  }
}

tarea.find = function(idTarea, callback) {
  if(database) {
    database.query('SELECT * FROM Tarea WHERE idTarea= ?', idTarea, function(error, resultados){
      if(error) {
        throw error;
      } else {
        callback(resultados);
      }
    });
  }
}

tarea.insert = function(data, callback){
  if(database){
    database.query("Call SP_insertTarea(?,?,?,?,?)",
      [data.titulo, data.descripcion, data.fechaInicial, data.fechaFinal, data.estado], function(error, resultado){
        if(error){
          throw error;
        }else{
          callback(null, {"insertId": resultado.insertId});
        }
      });
  }
}


tarea.delete = function(idTarea, callback){
  if(database){
    var consulta = "Call SP_deleteTarea(?)";
    database.query(consulta, idTarea,
      function(error, resultado){
        if(error) {
        throw error;
      } else {
        callback(null, {"Mensaje": "Eliminado"});
      }
    });
  }
}
module.exports = tarea;