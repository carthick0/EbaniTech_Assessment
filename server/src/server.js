const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const { PORT } = require('./config/serverConfig');
const labRoutes = require('./routes/labRoutes');
const authRoutes = require('./routes/authRoutes');
const receptionRoutes = require('./routes/receptionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const billRoutes = require('./routes/billRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/reception', receptionRoutes);
app.use('/api/lab', labRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/doctor',doctorRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
module.exports = app;
