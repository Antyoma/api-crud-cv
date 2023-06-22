const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');

const app = express();
const URL_CONNECT = 'mongodb+srv://admin23:8vUQnxc9AQYx61s7@apicrud.90cijym.mongodb.net/ApiCrud?retryWrites=true&w=majority'
app.use(express.json())

app.listen(3000, ()=>{
    console.log('Server activo')
})

//GET, POST, PUT, DELETE
app.get('/', (req, res) =>{
    res.send('Hello from Home')
})

//POST Agregar un producto
app.post('/product', async (req, res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


mongoose.connect(URL_CONNECT)
    .then(() => {
        console.log('Conectado con MongoDB')
    })
    .catch(error => {
        console.log(error);
    })