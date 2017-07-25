var express = require('express');
var categoria = require('../../model/categoria.model');
var router = express.Router();
var service = require('../../services');

router.get('/categoria/', function(req, res, next) {
  categoria.selectAll(function(categorias) {
    if(typeof categorias !== 'undefined') {
      res.json(categorias);
    } else {
      res.json({"mensaje" : "No hay categorias"});
    }
  });
});

router.get('/categoria/:idCategoria', function(req, res, next) {
  var idCategoria = req.params.idCategoria;
  categoria.find(idCategoria, function(categorias) {
    if(typeof categorias !== 'undefined') {
      res.json(categorias.find(c => c.idCategoria == idCategoria));
    } else {
      res.json({"mensaje" : "No hay categorias"});
    }
  });
});


router.post('/categoria', function(req, res, next) {
  var data = {
    idCategoria : null,
    nombreCa : req.body.nombreCa
  }

  categoria.insert(data, function(resultado){
    if(resultado && resultado.insertId > 0) {
      res.json({"mensaje" : "categoria ingresada"});
    } else {
      res.json({"mensaje":"No se ingreso la categoria"});
    }
  });
});


router.delete('/categoria/:idCategoria', function(req, res, next){
  var idCategoria = req.params.idCategoria;

  categoria.delete(idCategoria, function(resultado){
    if(resultado && resultado.mensaje === "Eliminado") {
      res.json({"mensaje":"Se elimino la categoria correctamente"});
    } else {
      res.json({"mensaje":"Se elimino la categoria"});
    }
  });
});


module.exports = router;