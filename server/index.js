const express = require('express');
const userRouter = require('./services/user');
const schedulingRouter = require('./services/schedule');
const DBConnection= require('./Database/DbConnect');

async function init() {
    DBConnection.dbConnect();
    const app = express();

    app.use(express.json())
    app.use('/users', userRouter);
    app.use('/schedules', schedulingRouter);
    app.listen(8000, ()=>console.log("SERVER listening on PORT 8000"));
}

init().catch(e => {
    console.log("🚀 ~ init ~ e:", e)
});