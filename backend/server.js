require ('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

//Import routes
const authRoute = require('./routes/auth');
const contactRoute = require('./routes/contacts');

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/auth', authRoute);
app.use('/api/contacts', contactRoute);

//Connect to DB
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB Database connected...');
})
.catch((err) => {
    console.error('Error connecting to MongoDB Database: ', err.message);
});


app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', './frontend/src/index.html'));
});

//server setup

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});