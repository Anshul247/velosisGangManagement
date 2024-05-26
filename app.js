
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 80;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("Missing MONGODB_URI environment variable");
    process.exit(1); 
}

mongoose.set('strictQuery', false);

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to the MongoDB database'))
.catch(error => {
    console.error('Failed to connect to the MongoDB database', error);
    process.exit(1); // Exit with failure
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, XMLHttpRequest, ngsw-bypass, Lng, Lang');
    next();
});

app.set('view engine', 'ejs');

// Define a middleware to serve the dashboard page
app.use('/dashboard', (req, res) => {
    // Render your dashboard page with a logout button
    res.send('Dashboard Page - <button onclick="logout()">Logout</button>');
});

// Assuming you have a route to handle logout
app.get('/logout', (req, res) => {
    // Handle logout logic
    // Redirect to login page or perform any other action
});

// Import and use routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log("Gangmanagement server has started at port number" + PORT);
});

