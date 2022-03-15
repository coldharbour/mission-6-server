const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
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
const Product = require('./Schemas')
const Listing = require('./Schemas')

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

app.post('/listingsCollectionData', async (req, res) => {
    Listing.find({}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    })
})
// test


//create a new document in the 'product' schema 

app.post('/createProduct', async (req, res) => {
    try {
        const product = new Product({
            name: `${req.body.name}`,
            description: `${req.body.description}`,
            quantity: `${req.body.quantity}`
        })
        product.save().then(() => console.log('Product Saved'))
        res.send(product);
    } catch (err) {
        res.send({ message: err });
    }
})


//connect to our mongoDB with mongoose and env varaibles
mongoose.connect(`mongodb+srv://${mongoDbData.mongoUser}:${mongoDbData.mongoPassword}@${mongoDbData.mongoCluster}.jmpny.mongodb.net/${mongoDbData.mongoDatabase}?retryWrites=true&w=majority`)

//server port listener
app.listen(port, function (err) {
    if (err) console.log("Error in server setup")
    console.log(`Server listening on Port ${port}`);
})
