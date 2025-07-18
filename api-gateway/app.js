const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());


module.exports = app;
