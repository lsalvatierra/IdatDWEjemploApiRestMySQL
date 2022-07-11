const express = require('express');

//const { getConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();    
        //Establece el puerto de salida de la aplicación
        this.port = process.env.PORT;
        //Define los path de las apis que construyamos
        this.usuariosPath='/api/usuarios';
        this.alumnoPath='/api/alumno';
        //Conectar a base de datos.
        //this.conectarDB();        
        //Llamamos a los Middlewares que tendrá la app
        this.middlewares();
        //Llamamos a las rutas configuradas
        this.routes();
    }
    // async conectarDB(){
    //     await getConnection();
    // }
    //
    middlewares(){
        //Directorio publico.
        this.app.use(express.static('public'));
        //Lectura y escritura de JSON
        this.app.use(express.json());        
    }
    //Rutas de navegación de la aplicación.
    routes()
    {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.alumnoPath, require('../routes/alumno'));
        // this.app.get('/api', (req, res) => {
        //     res.json('Hello World')
        //   })
    }
    //Ejecución de la aplicación.
    listen(){
        this.app.listen(this.port, () => { 
            console.log('Servidor corriendo en puesto', this.port);
        });
    }
}
module.exports = Server;