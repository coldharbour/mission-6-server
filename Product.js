const mongoose = require('mongoose')
const { stringify } = require('nodemon/lib/utils')

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    quantity: Number
})

module.exports = mongoose.model('product', productSchema)

