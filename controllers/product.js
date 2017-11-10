'use strict'

const Product = require('../models/product')
const User = require('../models/user')
const service = require('../services')

function getProduct (req, res){
    let productId = req.params.productId

    Product.findById(productId, (err, product) =>{
        if (err) res.status(500).send({ message:`No se pudo almacenar ${err}` })
        if (!product) res.status(404).send({ message:`Producto no encontrado` })
        
        res.status(200).send({ product })
    })
}

function getProducts (req, res){
    Product.find({}, (err, products) =>{
        if (!products) res.status(404).send({ message:`No existen productos` })
        
        res.status(200).send({ products })
    })
}

function updateProduct (req, res){
    let productId = req.params.productId
    let update = req.body

    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if (err) res.status(500).send({ message:`No se pudo actualizar ${err}` })
        if (!productUpdated) res.status(404).send({ message:`Producto no encontrado` })

        res.status(200).send({ product: productUpdated })     
    })    
}

function saveProduct (req, res){
    console.log('POST /api/product')
    console.log(req.body)

    User.findById(req.user, (err, user) => {
        if (err) res.status(500).send({ message:`Ups! algo anda mal => ${err}` })
        if (!user) res.status(404).send({ message:`Usuario no encontrado` })
        
        let product = new Product()
        product.name = req.body.name
        product.picture = req.body.picture
        product.price = req.body.price
        product.category = req.body.category
        product.description = req.body.description
        product.postedBy = user
        product.save((err, productStored) => {
            if (err){
                res.status(500).send({ message:`No se pudo almacenar ${err}` })
            }
            res.status(201).send({ product: productStored })
        })
    })   
}

function deleteProduct (id){
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) res.status(500).send({ message:`No se pudo eliminar ${err}` })
        if (!product) res.status(404).send({ message:`Producto no encontrado` })
        
        product.remove(err =>{
            if (err) res.status(500).send({ message:`No se pudo eliminar ${err}` })
            res.status(200).send({ message: 'Proucto elimino correctamente' })
        })        
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}