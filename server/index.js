require ('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

//Import Routes
const authRoute = require('./routes/auth');
const contactRoute = require('./routes/contacts');

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/auth', authRoute);
app.use('/api/contacts', contactRoute);


//Build
app.use(express.static('client/build'));

const path = require('path');
app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


//Server setup
const PORT = process.env.PORT || 5000;
console.log('server started on port:',PORT);
app.listen(PORT);

//Database setup
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