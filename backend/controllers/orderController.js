const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const sendOrderEmail = require('../utils/sendEmail');

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

    // Optional: validate stock
    const items = cart.items.map(i => ({
      product: i.product._id,
      name: i.name,
      size: i.size,
      qty: i.qty,
      price: i.price
    }));

    const totalPrice = items.reduce((sum, it) => sum + it.qty * it.price, 0);

    const order = await Order.create({ user: userId, items, totalPrice });

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    // Update Payment Status
    await Order.findByIdAndUpdate(req.params.id, {status: 'Paid'});
    // Decrease Stock
    for (let i of order.items) {
      await Product.findByIdAndUpdate(i.product, {$inc: {stock: -i.qty}});
    }
    try {
      sendOrderEmail(order, req.user);
    } catch (e) {
      console.error('Email send failed', e.message);
    }
    
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createOrder, getOrderById };
