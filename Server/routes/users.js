const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const db = require('../queries');
const checkAuth = require('../middleware/check-auth');

const User = require('../models/user');
const jwt = require('jsonwebtoken');


/* GET users list. */
router.get('/', (req, res, next) => {
    User.find()
        .select('username fullname phone avatar _id joined birthday gender email about')
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
                status: 'success',
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
    console.log(req.body);
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    User.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                status: 'success',
                message: 'user Edited',
                result: result,
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



/* GET check username exist. */
router.get('/checkUsername/:username', (req, res, next) => {
    const username = req.params.username;
    User.findOne({ username: username })
        .exec()
        .then(doc => {
          //  console.log(doc);
            if (doc) {
                res.status(200).json({
                    status: 'success',
                    message: 'username exist'
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

/* GET current user. */
router.get('/api/currentUser', checkAuth, (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(' ')
    // Get token from array
    const bearerToken = bearer[1];
    //Set the token
    req.token = bearerToken;
    jwt.verify(req.token, 'aloha', (err, decode) => {
        if (decode) {
            res.status(200).json({
                user: decode,
                status: 'success'
            })
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'token invalid',
                error: err
            })
        }
    })
});

/* GET  Login user by phone. */
router.get('/login/:phone', (req, res, next) => {
    const phone = req.params.phone;
    User.findOne({ phone: phone })
        .exec()
        .then(function (data) {
            if (data) {
                //create token
                jwt.sign({ data }, 'aloha', { expiresIn: '1d' }, (err, token) => {
                    res.status(200)
                        .json({
                            status: 'success',
                            token,
                            message: 'token created'
                        });
                });
            }
            else {
                res.status(404)
                    .json({
                        status: 'failed',
                        message: 'user does not exist'
                    });
            }
        })
        .catch(function (err) {
            return next(err);
        })
});



/* GET avatar user by username. */
router.get('/avatar/:username', (req, res, next) => {
    const username = req.params.username;
    User.findOne({ username: username })
        .exec()
        .then(function (data) {
            if (data) {
                res.status(201)
                .json({
                    status: 'succ',
                    avatar: data.avatar
                });
            }
            else {
                res.status(404)
                    .json({
                        status: 'failed',
                        message: 'user does not exist'
                    });
            }
        })
        .catch(function (err) {
            return next(err);
        })
});


module.exports = router;
