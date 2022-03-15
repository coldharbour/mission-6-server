const mongoose = require('mongoose')

//create schema for products
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    quantity: Number
})

//create schema for listings

module.exports = mongoose.model('product', productSchema)

