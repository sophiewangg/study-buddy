//entry point to server
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config(); //so that we can have env variables
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 8000; //access port variable from .env file or use port 8000 if not found 


connectDB();

const app = express();

//middleware so that res.body data can be read
app.use(express.json());
app.use(express.urlencoded({entended: false}));

app.use('/api/goals', require("./routes/goalRoutes")); // if api/goals is hit, it will look into the goalRoutes file

app.use(errorHandler); // overwrite default express error handler

app.listen(port, ()=> console.log(`server started on port ${port}`));