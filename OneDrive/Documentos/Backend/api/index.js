require('dotenv').config();

const server = require('./src/app')

const dbConnect = require('./src/db')

const morgan = require('morgan')

server.use(morgan("dev"));

// port va a buscar un puerto que nos de el servicio de hosting donde deployamos, si no, toma el que le pasemos
const port = process.env.PORT || 9000;


server.listen( port, () => {
    console.log(`listening on port ${port}`)
});

dbConnect();


