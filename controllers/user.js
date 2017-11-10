'use strict'

const User = require('../models/user')
const service = require('../services')

function signUp(req, res){
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    })
    
    user.save((err) => {
        if (err) res.status(500).send({ message:`No se pudo crear el usuario ${err}` })

        return res.status(201).send({ token: service.createToken(user) })
    })

}

function signIn(req, res){
    User.find({ email: req.body.email}, (err, user) => {
        if (err) res.status(500).send({ message: err })
        if (!user) res.status(404).send({ message:`No existe el usuario` })

        req.user = user

        res.status(200).send({
            message: 'Te has logeado correctamente',
            token: service.createToken(user)
        })

    })    
}

module.exports = {
    signIn,
    signUp
}