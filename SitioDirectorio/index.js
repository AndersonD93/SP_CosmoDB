var mongoose= require('mongoose');
const app= require('./app');
const port=4040;

mongoose.Promise= global.Promise;
mongoose.connect('mongodb://localhost:27017/clientes',{useNewUrlParser:true})
.then(()=>{
    console.log('La conexión a la base de datos es exitos');
    //Crear el servidor y ponerme a escuchar peticiones HTTP

    app.listen(port,()=>{
        console.log(`Serovidor ejecutandose en http://localhost:${port}`);
    })
})

