const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders were fetched'
  })
})

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Orders was created'
  })
})

router.get('/:orderid', (req, res, next) => {
  res.status(200).json({
    message: 'orders details',
    orderid: req.params.orderid
  })
})

router.delete('/:orderid', (req, res, next) => {
  res.status(200).json({
    message: 'orders details',
    orderid: req.params.orderid
  })
})

module.exports = router
