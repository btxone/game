const express = require('express');
const productRouter = require('./routes/product')
const categoryRouter = require('./routes/category')
const userRouter = require('./routes/user')
const reviewsRouter = require('./routes/reviews')
const cartRouter = require('./routes/cart')
const mercadoPagoRouter = require('./routes/mercadoPago')
const morgan = require('morgan')
const cors = require('cors')


const server = express();

// server.use(cors())
server.use(morgan("dev"));

//ruta de prueba
// server.get("/people", (req, res) => {
//     res.status(200).send("Estamos en la ruta /people");
// });


server.use(express.json());

server.use('/', productRouter)

server.use('/', categoryRouter)

server.use('/', userRouter)

server.use('/', reviewsRouter)

server.use('/', cartRouter)

server.use('/', mercadoPagoRouter)









module.exports = server;