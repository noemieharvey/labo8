const express = require('express');
const uuid = require('uuid/v4');
const _ = require('underscore');

const users = [];

userRouter = express.Router();

userRouter.post('/users', (req, res) => {
    const { username, password } = req.body;

    users.push({ username, password });
    console.log(users);
    res.sendStatus(201);
})

userRouter.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = _.findWhere(users, { username, password });

    if (_.isUndefined(user)) {
        res.sendStatus(401);
        return;
    }

    const token = uuid;
    user.token = token;
    res.cookie('token', token);
    res.send({token});
})

userRouter.get('/profil', (req, res) => {
    const token = req.cookies.token;
    const user = _.findWhere(users, {token});

    if(_.isUndefined((token)) || _.isUndefined((user))) {
        res.status(401).send('Your token is either invalid or has expired please reconnect.');
        return;
    }

    res.send(`Welcome to your profile ${user.username}`);
})

module.exports = userRouter;
