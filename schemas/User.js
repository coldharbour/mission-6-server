const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    password: String,
    email: String,
    phone_number: String,
    profile_picture: String,
    user_type: String,
    watchlist: Array,
})


module.exports = mongoose.model('user', userSchema)