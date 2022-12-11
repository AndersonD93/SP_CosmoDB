//Cargar modulos de Node para crear el servidor

var express=require('express');

//Crear instancia para ejecutar express (http)

var app = express();

//Cargar ficheros o rutas

var routes=require('./routes/routes');

//Middleware

app.use(express.urlencoded());
app.use(express.json());

//Añadir prefijos a las rutas / cargar rutas

app.use('/api',routes);

module.exports = app;