'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (err, res) =>{
    if(err) {
        return console.log(`No se pudo establecer la conexión: ${err}`)
    }
    console.log('Conexion establecida...')

    app.listen(config.port, ()=>{
        console.log(`ApiRest running en http://localhost:${config.port}`)
    })
})