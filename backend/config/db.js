const mongoose = require('mongoose');

const connectDB = async () => { //since all mongoose methods are async
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongoDB connected: ${conn.connection.host}`.cyan.underline);
    } catch (err) {
        console.log(error);
        process.exit(1); //exit process with error
    }
}

module.exports = connectDB;
