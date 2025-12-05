const express=require('express');
const cors=require('cors');
const cookie_parser=require('cookie-parser');

const app=express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookie_parser());

// Routes
const userRoutes = require('./routes/user.routes');
const wasteRoutes = require('./routes/waste.routes');
const recyclingRoutes = require('./routes/recycling.routes');
const adminRoutes = require('./routes/admin.routes');

app.use('/api/users', userRoutes);
app.use('/api/waste', wasteRoutes);
app.use('/api/recycling', recyclingRoutes);
app.use('/api/admin', adminRoutes);

module.exports=app;
