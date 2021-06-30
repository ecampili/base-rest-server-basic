const express = require('express');
const cors = require('cors')
require('dotenv').config();




class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/users'

        //middlewares
        this.middlewares();

        //rutas de la aplicacion
        this.routes();

    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());

        // directorio publico
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user'))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running at port: ${this.port}`)
        })
    }

}

module.exports = Server;