'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
    name: String,
    picture: String,
    price: { type: Number, default: 0 },
    category: { type: String, enum: ['computers', 'phones', 'accesories']},
    description: String,
    postedBy:{ 
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { 
        versionKey: false 
    }
)   

module.exports = mongoose.model('Product', ProductSchema)