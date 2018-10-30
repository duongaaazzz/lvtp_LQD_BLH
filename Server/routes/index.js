var express = require('express');
var router = express.Router();
var db = require('../queries');
const checkAuth = require('../middleware/check-auth');

router.get('/', function(req,res){
  res.render('index', { title:'WebAPI basic with PostgreSQL'});
});

router.get('/api/login/:phone', db.Login);

//users
router.get('/api/users', db.getList);
router.get('/api/users/:id', db.getOne);
router.get('/api/users/checkPhonenumber/:phone', db.getOnebyPhone);
router.post('/api/users', db.createUser);
router.put('/api/users/:userID', db.editUserInfor);
// router.delete('/api/users/:userID', db.Delete);

//events
router.get('/api/events', checkAuth ,db.getEvents);
router.get('/api/events/:username', db.getEventsbyUser);
router.post('/api/events/createEvent', db.createEvent);

module.exports = router;
