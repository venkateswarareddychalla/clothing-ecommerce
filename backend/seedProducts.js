require('dotenv').config();
const connectDB = require('./config/db');
const Product = require('./models/Product');

const sampleProducts = [
   { name: 'Classic White Tee', description: 'Cotton crew neck tee', price: 299, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab', category: 'Men', sizes: ['S','M','L','XL'], stock: 50 },
  { name: 'Black Hoodie', description: 'Comfort fleece hoodie', price: 899, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7', category: 'Men', sizes: ['M','L','XL'], stock: 30 },
  { name: 'Blue Jeans', description: 'Slim fit denim', price: 1499, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d', category: 'Men', sizes: ['30','32','34','36'], stock: 40 },
  { name: 'Summer Dress', description: 'Light summer dress', price: 1299, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446', category: 'Women', sizes: ['S','M','L'], stock: 20 },
  { name: 'Leather Jacket', description: 'Black faux leather', price: 4999, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5', category: 'Women', sizes: ['M','L','XL'], stock: 10 },
  { name: 'Striped Shirt', description: 'Casual button-up', price: 799, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c', category: 'Men', sizes: ['S','M','L'], stock: 25 },
  { name: 'Chino Pants', description: 'Comfort stretch chinos', price: 1199, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a', category: 'Men', sizes: ['30','32','34'], stock: 35 },
  { name: 'Graphic Tee', description: 'Printed cotton tee', price: 349, image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c', category: 'Kids', sizes: ['S','M','L'], stock: 60 },
  { name: 'Denim Jacket', description: 'Classic denim', price: 2499, image: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef', category: 'Men', sizes: ['M','L','XL'], stock: 15 },
  { name: 'Sweatpants', description: 'Soft lounge pants', price: 699, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b', category: 'Kids', sizes: ['M','L','XL'], stock: 40 },
  { name: 'Maxi Dress', description: 'Flowy maxi dress', price: 1599, image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956', category: 'Women', sizes: ['S','M','L'], stock: 12 },
  { name: 'Puffer Jacket', description: 'Warm insulated', price: 5999, image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb', category: 'Women', sizes: ['L','XL'], stock: 8 },
  { name: 'Corduroy Shirt', description: 'Textured shirt', price: 999, image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8', category: 'Men', sizes: ['M','L'], stock: 18 },
  { name: 'Cargo Shorts', description: 'Utility shorts', price: 549, image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c', category: 'Men', sizes: ['M','L'], stock: 22 },
  { name: 'Athletic Shorts', description: 'Breathable shorts', price: 399, image: 'https://images.unsplash.com/photo-1562886877-3729cd9731dc', category: 'Kids', sizes: ['S','M','L'], stock: 50 },
  { name: 'V-Neck Sweater', description: 'Light knit sweater', price: 899, image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531', category: 'Women', sizes: ['M','L'], stock: 20 },
  { name: 'Denim Skirt', description: 'Mini denim skirt', price: 799, image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc', category: 'Women', sizes: ['S','M'], stock: 14 },
  { name: 'Bomber Jacket', description: 'Casual bomber', price: 3299, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea', category: 'Men', sizes: ['M','L','XL'], stock: 11 },
  { name: 'Oxford Shirt', description: 'Smart casual shirt', price: 1099, image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10', category: 'Men', sizes: ['S','M','L','XL'], stock: 28 },
  { name: 'Sports Tee', description: 'Moisture-wicking tee', price: 449, image: 'https://images.unsplash.com/photo-1519568470290-c0c1fbfff16f', category: 'Kids', sizes: ['S','M','L'], stock: 45 }
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
