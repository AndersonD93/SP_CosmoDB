var express = require('express');

var Controller= require('../controllers/controllers');
var router=express.Router();

//router.post('/datos-curso',Controller.datosCurso);
//router.post('/test',Controller.test);
router.post('/get-token',Controller.getToken);
router.post('/mockBizagi',Controller.mockBizagi);

//routes Utiles(Crud)
router.post('/crear', Controller.crear);
router.post('/mockBizagiCliente', Controller.mockBizagiCliente);
//router.get('/clientes',Controller.getClientes);
//router.get('/clientes/:id',Controller.getCliente);
//router.put('/clientes/:id',Controller.update);
//router.delete('/clientes/:id',Controller.delete);

module.exports= router;

