const express = require('express');
const user = require('../models/user');

const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
    const { username, email, password } = req.body || {};
    console.log("🚀 ~ userRouter.post ~  req.body:",  req.body)

    const createUser = new user({
        username,
        email,
        password
    });
    await createUser.save();
    res.sendStatus(201);
});

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body || {};
    console.log("🚀 ~ userRouter.post ~  req.body:",  req.body)
    const existingUser = await user.findOne({email, password});
    if(existingUser){ 
        res.json({user:existingUser} );
        return;
    }
    res.sendStatus(400);
});

module.exports = userRouter;