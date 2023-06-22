const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
require('dotenv').config()

const app = express();
const URL_CONNECT = process.env.URL_CONNECT;
const PORT = process.env.PORT;
app.use(express.json())

app.listen(PORT, ()=>{
    console.log('Server activo')
})

//GET, POST, PUT, DELETE
app.get('/', (req, res) =>{
    res.send('Bienvenido a mi CRUD creado con NodeJS, Express, MondoDB y deploy en Railway. ' + ' ' + ' Debido a que la api aún no tiene un front, debes usarla mediante los endpoints: ' + ' GET: /products, GET: /product/:id, DELETE: /product/:id y PUT:/product/:id ')
})

//PUT Actualizar un producto
app.put('/product/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product){
            return res.status(404).json({message: `No se encontró el siguiente ID: ${id} `})
        }
        const productUpdated = await Product.findById(id)
        res.status(200).json(productUpdated)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//DELETE Borrar un producto por ID
app.delete('/product/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        if (!product){
            return res.status(404).json({message: `No se encontró el siguiente ID: ${id} `})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//GET Recuperar un producto por ID
app.get('/product/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//GET Recuperar todos los productos
app.get('/products', async (req, res) => {
    try{
        const product = await Product.find({})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
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