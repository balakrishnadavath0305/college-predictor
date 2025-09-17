// backend/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Simple health route
app.get('/', (req, res) => res.send('College Predictor API is running'));

// Routers (we will create these files next)
const predictRouter = require('./routes/predict');
const collegesRouter = require('./routes/colleges');
const authRouter = require('./routes/auth');

app.use('/api/predict', predictRouter);
app.use('/api/colleges', collegesRouter);
app.use('/api/auth', authRouter);

// Mongo connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/college_predictor';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
