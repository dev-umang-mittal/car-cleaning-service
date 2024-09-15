const mongoose = require('mongoose')

const user = new mongoose.Schema({
    username: { type: String, },
    email: { type: String, },
    password: { type: String, },
    role: { type: String, },
}, { timestamps: true });

module.exports =  mongoose.model("users", user);