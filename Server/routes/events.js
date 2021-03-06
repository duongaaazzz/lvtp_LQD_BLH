const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const db = require('../queries');
const checkAuth = require('../middleware/check-auth');

const Event = require('../models/event');
const User = require('../models/user');
const EventsControllers = require('../controllers/events')

/* GET events listing. */
router.get('/', checkAuth, EventsControllers.events_get_all);

/* GET event by id. */
router.get('/:eventId', checkAuth, EventsControllers.event_get_by_id);

/* CREATE event. */
router.post('/', checkAuth, EventsControllers.events_post_one);

/* UPDATE event. */
router.patch('/:eventId', checkAuth, EventsControllers.events_update_one);

/* DELETE event. */
router.delete('/:eventId', checkAuth, EventsControllers.events_delete_one);


/* Search events. */
router.get('/search/:key', checkAuth, EventsControllers.events_search);

/* GET events user create. */
router.get('/usercreate/:username', EventsControllers.get_user_events);

/* GET events user signed. */
router.get('/usersign/:userId', (req, res, next) => {
  const id = req.params.userId;
  Event.find({ userlist: id })
    .exec()
    .then(doc => {
      //console.log(doc);
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
                message: 'Signed',
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
                message: 'Unsigned',
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
/* comment to an event. */
router.patch('/comment/:eventId', (req, res, next) => {
  const id = req.params.eventId;
  Event.findById(id)
    .exec()
    .then(doc => {
      //console.log(doc);
      if (doc) {
        Event.updateOne({ _id: id }, { $push: { comments: req.body.comment } })
          .exec()
          .then(result => {
            doc.comments.push(req.body.comment);
            res.status(200).json({
              status: 'success',
              message: 'commented on an event',
              event: doc
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
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


/* get users an event. */
router.get('/registers/:eventId', (req, res, next) => {
  const id = req.params.eventId;
  users = []
  Event.findById(id)
    .exec()
    .then(doc => {
      //console.log(doc);
      if (doc) {
        if (!!doc.userlist) {
          User.find({ _id: { $in: doc.userlist } })
            .exec()
            .then(result => {
              res.status(200).json({
                status: 'success',
                result
              });
            }
            )
        }
        else {
          res.status(200).json({
            status: 'fail',
            message: 'there are no register'
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



/* delete comment to an event. */
router.patch('/delcomment/:eventId', (req, res, next) => {
  const id = req.params.eventId;
  Event.findById(id)
    .exec()
    .then(doc => {
      let index = doc.comments.findIndex(i => i == req.body.commentid);
      doc.comments = doc.comments.slice(index);
      // console.log(doc.comments);
      if (doc) {
        Event.updateOne({ _id: id }, { comments: doc.comments })
          .exec()
          .then(result => {
            res.status(200).json({
              status: 'success',
              message: 'commented on an event',
              event: doc
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
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


/* rate an event. */
router.patch('/rate/:eventId', (req, res, next) => {
  const id = req.params.eventId;
  Event.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        let index = doc.rates.findIndex(i => i.username === req.body.rate.username);
        if (index === -1) {
          Event.updateOne({ _id: id }, { $push: { rates: req.body.rate } })
            .exec()
            .then(result => {
              doc.rates.push(req.body.rate);
              res.status(200).json({
                status: 'success',
                message: 'rated event',
                event: doc
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({ error: err });
            });
        } else {
          //update rate
          doc.rates = doc.rates.slice(index, -1);
          doc.rates = doc.rates.push(req.body.rate);
          console.log('index: ', index);
          console.log('doc: ', doc.rates);
          Event.updateOne({ _id: id }, { rates: req.body.rate })
            .exec()
            .then(result => {
              res.status(200).json({
                status: 'success',
                message: 'rated event',
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

/* update rate an event. */
router.patch('/updateRate/:eventId', (req, res, next) => {
  const id = req.params.eventId;
  Event.findById(id)
    .exec()
    .then(doc => {
      let index = doc.rates.findIndex(i => i == req.body.rate.username);
      doc.rates = doc.rates.slice(index);
      doc.rates = doc.rates.push(req.body.rate);
      console.log('doc.rates', doc.rates);
      if (doc) {
        Event.updateOne({ _id: id }, { rates: doc.rates })
          .exec()
          .then(result => {
            // doc.rates.push(req.body.rate);
            res.status(200).json({
              status: 'success',
              message: 'update rate event',
              event: doc
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
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

/* delete rate an event. */
router.patch('/delRate/:eventId', (req, res, next) => {
  const id = req.params.eventId;
  Event.findById(id)
    .exec()
    .then(doc => {
      let index = doc.rates.findIndex(i => i.username === req.body.username);
      doc.rates = doc.rates.slice(index, -1);
      console.log('index: ', index);
      console.log('doc: ', doc.rates);
      if (doc) {
        Event.updateOne({ _id: id }, { rates: doc.rates })
          .exec()
          .then(result => {
            // doc.rates.push(req.body.rate);
            res.status(200).json({
              status: 'success',
              message: 'del rate event',
              event: doc
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
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


module.exports = router;
