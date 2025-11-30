const Cart = require('../models/Cart');
const Product = require('../models/Product');

// For authenticated users only (cart stored in DB)
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, size, qty } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });

    const existingIndex = cart.items.findIndex(i => i.product.toString() === productId && i.size === size);
    const newQty = existingIndex > -1 ? cart.items[existingIndex].qty + (qty || 1) : (qty || 1);
    
    if (newQty > product.stock) {
      return res.status(400).json({ message: 'Order quantity greater than stock available' });
    }

    if (existingIndex > -1) {
      cart.items[existingIndex].qty = newQty;
    } else {
      cart.items.push({ product: productId, name: product.name, size, qty: newQty, price: product.price });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { itemId, qty } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    
    const product = await Product.findById(item.product);
    if (product && qty > product.stock) {
      return res.status(400).json({ message: 'Order quantity greater than stock available' });
    }
    
    item.qty = qty;
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeCartItem };
