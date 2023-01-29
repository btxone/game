import express, { Application } from "express";
import userRoutes from '../routes/usuario';
import cors from 'cors';



class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.middlewares();
        //definir mis rutas
        this.routes();
    }

    middlewares() {

        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( express.static("public")); 

    }

    routes() {
        
        this.app.use( this.apiPaths.usuarios, userRoutes )

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port' + this.port);
        });
    }

}

export default Server;