const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Order = require('../models/orders')

router.get('/', (req, res, next) => {
  Order.find().populate('product')
    .exec()
    .then((docs) => { res.status(200).json(docs) })
    .catch((error) => { res.status(500).json(error) })
})

router.post('/', (req, res, next) => {
  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    quantity: req.body.quantity,
    product: req.body.productId
  })
  order.save()
    .then((result) => { res.status(201).json(result) })
    .catch((error) => { res.status(500).json(error) })
})

router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId).populate('product').exec()
    .then((order) => {
      res.status(200).json(order)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

router.delete('/:orderId', (req, res, next) => {
  Order.remove({ _id: req.params.orderId }).exec()
    .then((result) => { res.status(200).json(result) })
    .catch((err) => { res.status(500).json(err) })
})

module.exports = router
