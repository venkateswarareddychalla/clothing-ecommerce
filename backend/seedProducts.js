require('dotenv').config();
const connectDB = require('./config/db');
const Product = require('./models/Product');

const sampleProducts = [
  { name: 'Classic White Tee', description: 'Cotton crew neck tee', price: 299, image: 'https://picsum.photos/seed/tee1/400/400', category: 'T-Shirts', sizes: ['S','M','L','XL'], stock: 50 },
  { name: 'Black Hoodie', description: 'Comfort fleece hoodie', price: 899, image: 'https://picsum.photos/seed/hoodie1/400/400', category: 'Hoodies', sizes: ['M','L','XL'], stock: 30 },
  { name: 'Blue Jeans', description: 'Slim fit denim', price: 1499, image: 'https://picsum.photos/seed/jeans1/400/400', category: 'Jeans', sizes: ['30','32','34','36'], stock: 40 },
  { name: 'Summer Dress', description: 'Light summer dress', price: 1299, image: 'https://picsum.photos/seed/dress1/400/400', category: 'Dresses', sizes: ['S','M','L'], stock: 20 },
  { name: 'Leather Jacket', description: 'Black faux leather', price: 4999, image: 'https://picsum.photos/seed/jacket1/400/400', category: 'Jackets', sizes: ['M','L','XL'], stock: 10 },
  { name: 'Striped Shirt', description: 'Casual button-up', price: 799, image: 'https://picsum.photos/seed/shirt1/400/400', category: 'Shirts', sizes: ['S','M','L'], stock: 25 },
  { name: 'Chino Pants', description: 'Comfort stretch chinos', price: 1199, image: 'https://picsum.photos/seed/pants1/400/400', category: 'Pants', sizes: ['30','32','34'], stock: 35 },
  { name: 'Graphic Tee', description: 'Printed cotton tee', price: 349, image: 'https://picsum.photos/seed/tee2/400/400', category: 'T-Shirts', sizes: ['S','M','L'], stock: 60 },
  { name: 'Denim Jacket', description: 'Classic denim', price: 2499, image: 'https://picsum.photos/seed/jacket2/400/400', category: 'Jackets', sizes: ['M','L','XL'], stock: 15 },
  { name: 'Sweatpants', description: 'Soft lounge pants', price: 699, image: 'https://picsum.photos/seed/pants2/400/400', category: 'Pants', sizes: ['M','L','XL'], stock: 40 },
  { name: 'Maxi Dress', description: 'Flowy maxi dress', price: 1599, image: 'https://picsum.photos/seed/dress2/400/400', category: 'Dresses', sizes: ['S','M','L'], stock: 12 },
  { name: 'Puffer Jacket', description: 'Warm insulated', price: 5999, image: 'https://picsum.photos/seed/jacket3/400/400', category: 'Jackets', sizes: ['L','XL'], stock: 8 },
  { name: 'Corduroy Shirt', description: 'Textured shirt', price: 999, image: 'https://picsum.photos/seed/shirt2/400/400', category: 'Shirts', sizes: ['M','L'], stock: 18 },
  { name: 'Cargo Shorts', description: 'Utility shorts', price: 549, image: 'https://picsum.photos/seed/shorts1/400/400', category: 'Shorts', sizes: ['M','L'], stock: 22 },
  { name: 'Athletic Shorts', description: 'Breathable shorts', price: 399, image: 'https://picsum.photos/seed/shorts2/400/400', category: 'Shorts', sizes: ['S','M','L'], stock: 50 },
  { name: 'V-Neck Sweater', description: 'Light knit sweater', price: 899, image: 'https://picsum.photos/seed/sweater1/400/400', category: 'Sweaters', sizes: ['M','L'], stock: 20 },
  { name: 'Denim Skirt', description: 'Mini denim skirt', price: 799, image: 'https://picsum.photos/seed/skirt1/400/400', category: 'Skirts', sizes: ['S','M'], stock: 14 },
  { name: 'Bomber Jacket', description: 'Casual bomber', price: 3299, image: 'https://picsum.photos/seed/jacket4/400/400', category: 'Jackets', sizes: ['M','L','XL'], stock: 11 },
  { name: 'Oxford Shirt', description: 'Smart casual shirt', price: 1099, image: 'https://picsum.photos/seed/shirt3/400/400', category: 'Shirts', sizes: ['S','M','L','XL'], stock: 28 },
  { name: 'Sports Tee', description: 'Moisture-wicking tee', price: 449, image: 'https://picsum.photos/seed/tee3/400/400', category: 'T-Shirts', sizes: ['S','M','L'], stock: 45 }
];

const seed = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log('Seeded products');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
