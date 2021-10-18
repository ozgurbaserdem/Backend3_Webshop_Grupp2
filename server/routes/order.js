const express = require('express');

const router = express.Router();
const orderController = require('../controllers/orderController');

router
  .get('/', orderController.getAllOrders)
  .get('/user/:id', orderController.getAllUserOrders)
  .post('/', orderController.addOrder);

router
  .get('/:id', orderController.getSingleOrder)
  .post('/:id', orderController.toggleIsShipped);

module.exports = router;
