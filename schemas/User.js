const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    email_address: String,
    phone_number: Number,
    profile_picture: String,
    user_type: String
})

module.exports = mongoose.model('user', userSchema)