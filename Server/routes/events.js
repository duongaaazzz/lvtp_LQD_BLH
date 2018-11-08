const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const db = require('../queries');
const checkAuth = require('../middleware/check-auth');

const Event = require('../models/event');



/* GET events listing. */
router.get('/', checkAuth, (req, res, next) => {
    Event.find()
        .select('title description avatar type created_by userlist time_start time_end price _id')
        .limit(10)
        .exec()
        .then(docs => {
            console.log(docs);
            const respone = {
                status: 'success',
                count: docs.length,
                events: docs,
            };
            if (Object.keys(docs).length !== 0) {
                res.status(200).json(respone);
            } else {
                res.status(404).json({
                    message: 'There are 0 event'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

/* GET event by id. */
router.get('/:eventId', (req, res, next) => {
    const id = req.params.eventId;
    Event.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'event does not exist' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

/* CREATE event. */
router.post('/', (req, res, next) => {
    const event = new Event({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        avatar: req.body.avatar,
        type: req.body.type,
        created_by: req.body.created_by,
        userlist: req.body.userlist,
        time_start: req.body.time_start,
        time_end: req.body.time_end
    });
    event
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Successfully create event ",
                createEvent: event
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

/* UPDATE event. */
router.patch('/:eventId', (req, res, next) => {
    const id = req.params.eventId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Event.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Successfully update event ",
                result: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

/* DELETE event. */
router.delete('/:eventId', (req, res, next) => {
    const id = req.params.eventId;
    Event.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Event Deleted',
                result: result,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});





/* Search events. */
router.get('/search/:key', (req, res, next) => {
    const key = req.params.key;
    Event.find({ $text: { $search: key } })
        .skip(20)
        .limit(10)
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'event does not exist' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

/* GET events user create. */
router.get('/usercreate/:userId', (req, res, next) => {
    const id = req.params.userId;
    Event.find({ created_by: id })
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    status: 'success',
                    events: doc
                });
            } else {
                res.status(404).json({ message: 'event does not exist' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

/* GET events user signed. */
router.get('/usersign/:userId', (req, res, next) => {
    const id = req.params.userId;
    Event.find({ userlist: id })
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    status: 'success',
                    events: doc
                });
            } else {
                res.status(404).json({ message: 'event does not exist' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});


/* GET event by type. */
router.get('/type/:Etype', (req, res, next) => {
    const Etype = req.params.Etype;
    Event.find({ type: Etype })
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'event does not exist' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});


/* Sign Up to an event. */
router.patch('/sign/:eventId', (req, res, next) => {
    const id = req.params.eventId;
    Event.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                let index = doc.userlist.findIndex(i => i == req.body.userid);
                console.log('index: ', index);
                console.log('userid: ', req.body.userid);
                if (index < 0) {
                    Event.updateOne({ _id: id }, { $push: { userlist: req.body.userid } })
                        .exec()
                        .then(result => {
                            doc.userlist.push(req.body.userid);
                            res.status(200).json({
                                status: 'success',
                                message: "Signed",
                                event: doc
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({ error: err });
                        });
                } else {
                    Event.updateOne({ _id: id }, { $pull: { userlist: req.body.userid } })
                        .exec()
                        .then(result => {
                            doc.userlist.pull(req.body.userid);
                            res.status(201).json({
                                status: 'success',
                                message: "Unsigned",
                                event: doc
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({ error: err });
                        });
                }
            } else {
                res.status(404).json({ message: 'event does not exist' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;
