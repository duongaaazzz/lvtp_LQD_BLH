const express = require('express');
const router = express.Router();
const db = require('../queries');
const checkAuth = require('../middleware/check-auth');

router.get('/', function(req,res){
  res.render('index', { title:'Yolo API'});
});


module.exports = router;
