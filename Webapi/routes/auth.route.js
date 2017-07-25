var express = require('express');
var jwt = require('jsonwebtoken');
var usuario = require('../model/usuario.model');
var router = express.Router();

router.post('/auth/', function (req, res, next) {
	var data = {
		nick: req.body.nick,
		contrasena: req.body.contrasena
	}
	usuario.autenticar(data, function(resultado){
		if(typeof resultado !== undefined){
			var temp = {
				idUsuario: null,
				nick: req.body.nick,
				contrasena: req.body.contrasena
			}
			console.log(temp);
			var token = 'Bearer' + jwt.sign(temp, 'secret');
			res.setHeader('Authorization', token);

			res.json({
				estado: true,
				mensaje: "Se autorizo el acceso",
				token: token
			});
		} else {
			res.json({
				estado: false,
				mensaje: "No hay usuarios"
			});
		}
	});
});	
module.exports = router;