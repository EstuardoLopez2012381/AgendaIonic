var express = require('express');
var tarea = require('../../model/tarea.model');
var router = express.Router();

router.get('/tarea/', function(req, res, next) {
 
  tarea.selectAll(function(tareas) {
    if(typeof tareas !== 'undefined') {
      res.json(tareas);
    } else {
      res.json({"mensaje" : "No hay tareas, para mostrar"});
    }
  });
});

router.get('/tarea/:idTarea', function(req, res, next) {
  var idTarea = req.params.idTarea;
  tarea.find(idTarea, function(tareas) {
    if(typeof tareas !== 'undefined') {
      res.json(tareas.find(c => c.idTarea == idTarea));
    } else {
      res.json({"mensaje" : "No hay contactos"});
    }
  });
});

router.post('/tarea', function(req, res, next) {
  var data = {
    titulo : req.body.titulo,
    descripcion : req.body.descripcion,
    fechaInicial : req.body.fechaInicial,
    fechaFinal : req.body.fechaFinal,
    estado : req.body.estado,
  };
  tarea.insert(data, function(resultado){
    if(resultado && resultado.affectedRows > 0) {
      res.json({
        estado: true,
        mensaje: "tarea agregada"
      });
    } else {
      res.json({"mensaje":"No se ingreso"});
    }
  });
});


router.delete('/tarea/:idTarea', function(req, res, next){
  var idTarea = req.params.idTarea;

  tarea.delete(idTarea, function(resultado){
    if(resultado && resultado.mensaje === "Eliminado") {
      res.json({"mensaje":"Se elimino la tarea correctamente"});
    } else {
      res.json({"mensaje":"No Se elimino la tarea"});
    }
  });
});



module.exports = router;