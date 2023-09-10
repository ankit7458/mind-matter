const mongoose = require('mongoose')
require('dotenv').config();

const dbURL = process.env.MONGO_URI

const dataBaseConnect = () => {
    try {
        mongoose.connect(dbURL)
        console.log("Database Connected Successfully!")
    } catch (error) {
        console.log(error)
    }
}

module.exports = dataBaseConnect;