const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);

module.exports = app;