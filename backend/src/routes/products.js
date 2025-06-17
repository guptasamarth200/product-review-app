const express = require('express');
const router = express.Router();
const { Product, Review, User } = require('../models');

// Get all products with their reviews
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{
        model: Review,
        include: [User]
      }]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single product with its reviews
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{
        model: Review,
        include: [User]
      }]
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new product (admin only)
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 