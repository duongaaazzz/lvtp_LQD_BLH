
const Event = require('../models/event');
const mongoose = require('mongoose');


exports.events_get_all = (req, res, next) => {
  Event.find()
    .select('title description avatar type created_by userlist time_start time_end price _id location comments rates')
    .limit(10)
    .exec()
    .then(docs => {
      // console.log(docs);
      const respone = {
        status: 'success',
        count: docs.length,
        events: docs,
      };
      if (Object.keys(docs).length !== 0) {
        res.status(200).json(respone);
      } else {
        res.status(200).json({
          status: 'success',
          message: 'There are 0 event'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}

exports.event_get_by_id = (req, res, next) => {
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
}                                          


exports.events_post_one = (req, res, next) => {
  const typed = req.body.type;
  console.log(typed.split("|"));
  console.log('event: ', req.body);
  const event = new Event({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    avatar: req.body.avatar,
    type: typed.split("|"),
    location: req.body.location,
    created_by: req.body.created_by,
    time_start: req.body.time_start,
    time_end: req.body.time_end
  });
  event
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Successfully create event ',
        createEvent: event,
        status: 'success'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}

exports.events_update_one = (req, res, next) => {
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
        status: 'success',
        message: 'Successfully update event ',
        result: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}

exports.events_delete_one = (req, res, next) => {
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
}

exports.events_search = (req, res, next) => {
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
}


exports.get_user_events = (req, res, next) => {
  const username = req.params.username;
  Event.find({ created_by: username })
    .exec()
    .then(doc => {
      //   console.log(doc);
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
}