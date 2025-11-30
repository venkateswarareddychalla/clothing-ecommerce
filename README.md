# Clothing E-Commerce Application

Full-stack MERN e-commerce application for a clothing brand with user authentication, product browsing, shopping cart, and order management.

## Features

- User registration and login with JWT authentication
- Product browsing with search, filters (category, size, price), and pagination
- Shopping cart (works for both guest and logged-in users)
- Guest cart merges with user cart on login
- Order placement with email confirmation via Nodemailer
- 20+ sample products with categories
- Stock validation to prevent over-ordering
- Responsive design with mobile navigation

## Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT authentication with HTTP-only cookies
- bcryptjs for password hashing
- Nodemailer for email notifications
- express-validator for input validation

**Frontend:**
- React.js with Vite
- React Router for navigation
- Context API for state management
- Tailwind CSS for styling
- Axios for API calls

## Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Gmail account for email (or Mailtrap for testing)

## Setup Instructions

### 1. Clone Repository

```bash
git clone <repository-url>
cd clothing-ecommerce
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_secret_key
NODE_ENV=development
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

**Gmail App Password Setup:**
1. Enable 2-factor authentication on your Google account
2. Go to Google Account → Security → App passwords
3. Generate password for "Mail"
4. Use the 16-character password in EMAIL_PASS

**Alternative - Use Mailtrap for testing:**
```env
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_pass
MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
```

Seed the database with sample products:

```bash
node seedProducts.js
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env` file in frontend folder:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Running the Application

### Start Backend Server

```bash
cd backend
npm run server
```

Backend runs on http://localhost:5000

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend runs on http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products (with filters & pagination)
- `GET /api/products/categories` - Get all categories
- `GET /api/products/:id` - Get single product

### Cart (Protected)
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove` - Remove item from cart

### Orders (Protected)
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details

## Usage Flow

1. **Browse Products**: Visit homepage or products page
2. **Add to Cart**: Select size and quantity, add items (works without login)
3. **Register/Login**: Create account or login (guest cart automatically merges)
4. **Checkout**: Review cart and place order
5. **Confirmation**: Receive order confirmation email

## Key Features Explained

### Guest Cart
- Cart stored in localStorage for non-logged-in users
- Automatically merges with user's database cart on login

### Stock Validation
- Prevents adding more items than available stock
- Validates on both add to cart and quantity update
- Shows error message when stock limit exceeded

### Filters
- Search by product name or description
- Filter by category (dynamically loaded from database)
- Filter by size (S, M, L, XL)
- Filter by price range (min/max)
- All filters work together
- Clear filters button with active state indicator

### Responsive Design
- Mobile-friendly navigation with hamburger menu
- Responsive product grid
- Optimized filter layout for mobile devices

## Project Structure

```
clothing-ecommerce/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── utils/
│   │   └── sendEmail.js
│   ├── seedProducts.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   └── OrderSuccess.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── .env
└── README.md
```

## Troubleshooting

**MongoDB Connection Error:**
- Verify MONGO_URI in .env
- Check MongoDB service is running
- Ensure IP whitelist in MongoDB Atlas

**Email Not Sending:**
- Verify Gmail App Password (not regular password)
- Check EMAIL_USER and EMAIL_PASS in .env
- Use Mailtrap for testing instead

**CORS Issues:**
- Ensure backend CORS is configured for frontend URL
- Check withCredentials is set in axios

**Cart Not Syncing:**
- Clear browser localStorage
- Check JWT token in cookies
- Verify backend authentication middleware

## License

MIT
