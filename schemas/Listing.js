const mongoose = require('mongoose')


const listingSchema = new mongoose.Schema({
    listing_id: Number,
    property_type: String,
    availability: Date,
    lease_duration: String,
    access: Number,
    furnishing: Number,
    price: Number,
    city: String,
    region: String,
    suburb: String,
    bedroom_count: Number,
    bathroom_count: Number,
    parking_onstreet: Number,
    parking_offstreet: Number,
    garage_space: Number,
    //if set to '0' no garage
    pet_friendly: Number,
    fibre: Number,
    garden: Number,
    balcony: Number,
    supermarkets: Number,
    parks: Number,
    dog_parks: Number,
    friendly_neighbourhood: Number,
    images: String
})

//export models to index.js
module.exports = mongoose.model('listings', listingSchema)