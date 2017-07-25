var express = require('express');
var cita = require('../../model/cita.model');
var router = express.Router();

router.get('/cita/', function(req, res, next) {
 
  cita.selectAll(function(citas) {
    if(typeof citas !== 'undefined') {
      res.json(citas);
    } else {
      res.json({"mensaje" : "No hay citas, para mostrar"});
    }
  });
});

router.get('/cita/:idCita', function(req, res, next) {
  var idCita = req.params.idCita;
  cita.find(idcita, function(citas) {
    if(typeof citas !== 'undefined') {
      res.json(citas.find(c => c.idCita == idCita));
    } else {
      res.json({"mensaje" : "No hay contactos"});
    }
  });
});

router.post('/cita', function(req, res, next) {
  var data = {
    fecha : req.body.fecha,
    lugar : req.body.lugar,
    asunto : req.body.asunto,
    idContacto : req.body.idContacto,
    detalle : req.body.detalle,
  };
  cita.insert(data, function(resultado){
    if(resultado && resultado.affectedRows > 0) {
      res.json({
        estado: true,
        mensaje: "cita agregada"
      });
    } else {
      res.json({"mensaje":"No se ingreso"});
    }
  });
});


router.delete('/cita/:idCita', function(req, res, next){
  var idCita = req.params.idCita;

  cita.delete(idCita, function(resultado){
    if(resultado && resultado.mensaje === "Eliminado") {
      res.json({"mensaje":"Se elimino la cita correctamente"});
    } else {
      res.json({"mensaje":"No Se elimino la cita"});
    }
  });
});



module.exports = router;