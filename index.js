
const express = require('express')
const cors = require('cors')
const { dbConnection } = require('./database/config')
require('dotenv').config()


// Crear el servidor de express
const app = express()

// Base de datos 
dbConnection()

// CORS
app.use(cors())

// Directorio publico
app.use(express.static('public'))

// lectura y parseo del body
app.use(express.json())

// Rutas 
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))


// escuchar las peticiones
app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo el puerto ${process.env.PORT}`);
})
