const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

const CategoryRoutes = require('./routes/category');
const AuthRoutes = require('./routes/auth');
const PostRoutes = require('./routes/posts');

dotenv.config();

// Connect to MongoDB
// const mongourl = process.env.DB_CONNECT;
const mongourl = `mongodb://db:27017`;
mongoose.connect(mongourl,{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log('Connected to MongoDB');
});




// Middlewares
app.use(morgan('dev'));

// To parse Body
app.use(express.json());

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization, auth-token');
    if(req.method === 'OPTIONS')
    {
        res.header('Access-Control-Allow-Methods','PUT, POST, DELETE, PATCH, GET');
        return res.status(200).json({});
    }
    next();
});
// app.use('/',(req, res, next)=>{
//     res.send('Home Page');
// });
// Route - /category
app.use('/api/v1/category',CategoryRoutes);

// Auth Routes - /register /login
app.use('/api/v1/user/',AuthRoutes);

// DashboardRoutes
app.use('/api/v1/posts',PostRoutes);

// Error Handling
app.use((req, res, next) =>{
    const error = new Error('Route Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        }
    });
});

module.exports = app;