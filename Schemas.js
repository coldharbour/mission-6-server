const mongoose = require('mongoose')

//create schema for products
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    quantity: Number
})

//create schema for listings
const listingSchema = new mongoose.Schema({
    listing_id: Number,
    property_type: String,
    availability: Date,
    lease_duration: String,
    access: String,
    furnishing: String,
    price: String,
    city: String,
    region: String,
    suburb: String,
    bedroom_count: String,
    bathroom_count: String,
    parking_onstreet: String,
    parking_offstreet: String,
    garage_space: String,
    //if set to '0' no garage
    pet_friendly: String,
    fibre: String,
    garden: String,
    balcony: String,
    supermarkets: String,
    parks: String,
    dog_parks: String,
    friendly_neighbourhood: String,
    images: String
})

//export models to index.js
module.exports = mongoose.model('listings', listingSchema)
module.exports = mongoose.model('product', productSchema)

