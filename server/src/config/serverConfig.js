const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

module.exports = { PORT, JWT_SECRET };
