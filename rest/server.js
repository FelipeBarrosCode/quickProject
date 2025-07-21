const express = require('express');

const flightsRouter = require('./routes/route');
const authRoutes = require('./routes/auth');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const cookieParser = require('cookie-parser');
app.use(cookieParser());
const cors = require('cors');
app.use(cors({ origin: 'https://quick-project-two.vercel.app', credentials: true }));

mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((err) =>
console.error("MongoDB connection error:", err));


app.use(express.json());
app.use('/flights', flightsRouter);

app.use('/api/auth', authRoutes);
app.listen(4000, () => {
console.log('REST API running at http://localhost:4000');
});