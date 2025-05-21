const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const regRoute = require('./routes/reg');
const app = express();
const loginroute = require('./routes/login');
const user = require('./routes/userAuth');
const transactionRoute = require('./routes/transactionRoutes');

// Middleware
app.use(cors());
app.use(express.json()); // JSON parser
app.use('/api',regRoute);
app.use('/api',loginroute);
app.use('/api',user);
app.use('/api',transactionRoute);
// Connect Database
connectDB();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
