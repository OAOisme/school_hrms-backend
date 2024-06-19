const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();


//Routes
const adminRoutes = require('./routes/admin');
const employeeRoutes = require('./routes/employee');
const feedbackRoutes = require('./routes/feedback');
const NoUserRoutes = require('./routes/nouser');

mongoose.connect('mongodb://localhost:27017/hrms')
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Allow these headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS'); // Allow these methods
    next();
});

app.use('/api/admin', adminRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api', NoUserRoutes);


app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send(err.message);

});



app.listen(process.env.PORT || 3003, () => {
    console.log('Server started!');
});