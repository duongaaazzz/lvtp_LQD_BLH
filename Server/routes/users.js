const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const db = require('../queries');
const checkAuth = require('../middleware/check-auth');

const User = require('../models/user');



/* GET users list. */
router.get('/', (req, res, next) => {
    User.find()
        .select('username fullname phone avatar _id joined')
        .exec()
        .then(docs => {
            console.log(docs);
            const respone = {
                count: docs.length,
                users: docs,
            };
            if (Object.keys(docs).length !== 0) {
                res.status(200).json(respone);
            } else {
                res.status(404).json({
                    message: 'There are 0 user'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

/* GET user by id. */
router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'user does not exist' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

/* CREATE user. */
router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        phone: req.body.phone,
        fullname: req.body.fullname,
        avatar: req.body.avatar,
    });
    user
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Successfully create user ",
                createUser: user
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

/* UPDATE user. */
router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    User.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Successfully update user ",
                result: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

/* DELETE event. */
router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'user Deleted',
                result: result,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});



/* GET user by phone. */
router.get('/checkPhonenumber/:phone', (req, res, next) => {
    const phone = req.params.phone;
    User.findOne({ phone: phone })
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    status: 'succeed',
                    user: doc,
                });
            } else {
                res.status(404).json({
                    status: 'failed',
                    message: 'user does not exist'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;
