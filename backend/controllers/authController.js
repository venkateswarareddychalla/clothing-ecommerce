const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Cart = require('../models/Cart');
const { validationResult } = require('express-validator');

const register = async (req, res) => {
  try {
    const {errors} = validationResult(req);
    if (errors.length) return res.status(400).json({ message: errors[0].msg});

    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashed });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    res.status(201).json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const {errors} = validationResult(req);
    if (errors.length) return res.status(400).json({ message: errors[0].msg });

    const { email, password, cart: guestCart } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // merge guest cart (if provided) into user's DB cart
    if (Array.isArray(guestCart) && guestCart.length > 0) {
      let cart = await Cart.findOne({ user: user._id });
      if (!cart) cart = await Cart.create({ user: user._id, items: [] });

      for (const item of guestCart) {
        const { product: productId, size, qty, price, name } = item;
        const existingIndex = cart.items.findIndex(i => i.product.toString() === productId && i.size === size);
        if (existingIndex > -1) {
          cart.items[existingIndex].qty += Number(qty || 1);
        } else {
          cart.items.push({ product: productId, name: name || '', size, qty: Number(qty || 1), price: Number(price || 0) });
        }
      }
      await cart.save();
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    res.json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};

module.exports = { register, login, logout };
