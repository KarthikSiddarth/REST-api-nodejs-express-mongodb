const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Product = require('../models/products')

router.get('/', (req, res, next) => {
  Product.find()
    .exec()
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json(result)
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
      .catch(err => {
        res.status(500).json({
          err })
      })
  })
})

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({message: 'not found'})
      }
    })
    .catch((err) => { res.status(500).json(err) })
})

router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.update({_id: id}, { $set: {
    name: req.params.newName,
    price: req.params.newPrice
  }
  })
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
