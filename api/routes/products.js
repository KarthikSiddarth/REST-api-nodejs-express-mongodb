const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Product = require('../models/products')

router.get('/', (req, res, next) => {
  Product.find()
    .exec()
    .then((result) => {
      const response = {
        count: result.length,
        product: result.map((doc) => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/products/'
            }
          }
        })
      }
      if (result.length > 0) {
        res.status(200).json(response)
      } else {
        res.status(400).json({ message: 'no entries found' })
      }
    })
    .catch((err) => {
      res.status(404).json(err)
    })
})

router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  })
  product.save().then(result => {
    res.status(201).json({
      message: 'Handling POST requests to /products',
      createdProduct: product })
  })
    .catch(err => {
      res.status(500).json({
        error: err })
    })
})

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.findById(id)
    .exec()
    .then((doc) => {
      const response = {
        name: doc.name,
        price: doc.price,
        _id: doc._id,
        request: {
          message: 'to get all products, visit the list',
          type: 'GET',
          url: 'http://localhost:3000/products'
        }
      }
      if (doc) {
        res.status(200).json(response)
      } else {
        res.status(404).json({message: 'not found'})
      }
    })
    .catch((err) => { res.status(500).json(err) })
})

router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId
  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }
  console.log(updateOps)
  Product.findByIdAndUpdate({_id: id}, { $set: updateOps }, { new: true })
    .exec()
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.remove({_id: id})
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports = router
