const mongoose = require("mongoose");

class DBConnection {
    static async dbConnect() {
    // mongdb url
        const mongoUrl = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/demo";
        // connect
        const conn = await mongoose.connect(mongoUrl);
        return conn;
    }
}
module.exports = DBConnection;