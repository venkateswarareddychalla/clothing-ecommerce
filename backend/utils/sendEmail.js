const nodemailer = require('nodemailer');

// Create transporter depending on environment variables.
// Prefer Mailtrap for development (safer). If MAILTRAP_USER is not set,
// fallback to Gmail if EMAIL_USER/EMAIL_PASS present.
function createTransporter() {
  if (process.env.MAILTRAP_USER) {
    return nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST || 'smtp.mailtrap.io',
      port: Number(process.env.MAILTRAP_PORT) || 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
      }
    });
  }

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
  }

  // No mail transport configured: return a noop transporter that logs.
  return {
    sendMail: async (opts) => {
      console.log('No mail transport configured. Email would be:', opts);
      return Promise.resolve();
    }
  };
}

const transporter = createTransporter();

const sendOrderEmail = async (order, user) => {
  const to = (user && user.email) || process.env.EMAIL_USER || 'no-reply@example.com';
  const htmlItems = order.items.map(item => `<p>${item.name} (${item.size}) x${item.qty} - ₹${item.price}</p>`).join('');

  const mailOptions = {
    from: process.env.EMAIL_USER || 'no-reply@example.com',
    to,
    subject: `Order Confirmation - #${order._id}`,
    html: `<h1>Thank you for your order!</h1>
           <p>Order ID: ${order._id}</p>
           <p>Date: ${new Date(order.orderDate || Date.now()).toLocaleString()}</p>
           <h3>Items:</h3>
           ${htmlItems}
           <h2>Total: ₹${order.totalPrice}</h2>
           <p>We appreciate your business!</p>`
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Order email sent:', result && result.messageId ? result.messageId : 'ok');
    return result;
  } catch (err) {
    console.error('Error sending order email:', err.message || err);
    throw err;
  }
};

module.exports = sendOrderEmail;
