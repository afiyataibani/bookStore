const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://afiyataibani:12345@bookstore.istbn.mongodb.net/')

const db = mongoose.connection;

db.on("connected", (err)=>{
    if (err) {
        console.error("Error connecting to database");
        return false;
    }
    console.log("Connected to database");
});

module.exports = db;