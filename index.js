const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const port = process.env.PORT || 8081;
const app = express();
app.use(cors());
app.use(express.json());

//basic api for testing

app.get('/', (req, res) => {
    res.send('<h1>its not working for now</h1>')
})


//mongodb enivroment variables

const mongoDbData = {
    mongoUser: process.env.DB_USER,
    mongoPassword: process.env.DB_PASSWORD,
    mongoCluster: process.env.DB_CLUSTER,
    mongoDatabase: process.env.DB_NAME
}

//calling our schemas from external js files
const Product = require('./schemas/Product')
const Listing = require('./schemas/Listing')
const User = require('./schemas/User')

//api that sends all the documents in a schema
app.post('/productCollectionData', async (req, res) => {
    Product.find({}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    })
})

app.post('/listingCollectionData', async (req, res) => {
    Listing.find({}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    })
})
// test


//create a new user in the 'user' schema using bcrypt to hash password

app.post('/createUser', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: hashedPassword,
            email_address: req.body.email_address,
            phone_number: req.body.phone_number,
            profile_picture: req.body.profile_picture,
            user_type: req.body.user_type
        })
        user.save().then(() => console.log('User Created'))
        res.send(user);
    } catch (err) {
        res.send({ message: err });
    }
})

//login endpoint to check if user is in database

app.post('/userLogin', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    User.findOne({ $or: [{ email_address: username }, { phone_number: username }] })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.send(err)
                    }
                    if (result) {
                        res.send('Login successful!')
                    } else {
                        res.send('Password does not match!')
                    }
                })
            } else {
                res.send('No user found!')
            }
        })
})


//connect to our mongoDB with mongoose and env varaibles
mongoose.connect(`mongodb+srv://${mongoDbData.mongoUser}:${mongoDbData.mongoPassword}@${mongoDbData.mongoCluster}.jmpny.mongodb.net/${mongoDbData.mongoDatabase}?retryWrites=true&w=majority`)

//server port listener
app.listen(port, function (err) {
    if (err) console.log("Error in server setup")
    console.log(`Server listening on Port ${port}`);
})
