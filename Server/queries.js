var promise = require('bluebird');
var options = {
    promiseLib: promise
}
var pgp = require('pg-promise')(options)
var connectString = 'postgres://postgres:1212@35.221.110.118:5432/yoloDatabase';
var db = pgp(connectString);
const jwt = require('jsonwebtoken');

//login
function Login(req, res, next) {
    db.any("select * from users where phone ='" + req.params.phone + "'")
        .then(function (data) {
            if (Object.keys(data).length === 0)
                res.status(404)
                    .json({
                        status: 'failed',
                        data: data,
                        message: 'user does not exist'
                    });
            else
                //create token
                jwt.sign({ data }, 'secretkey', { expiresIn: '30m' }, (err, token) => {
                    res.status(200)
                        .json({
                            status: 'success',
                            token,
                            message: 'token created'
                        });
                });

        })
        .catch(function (err) {
            return next(err);
        })


}



function getList(req, res, next) {
    db.any("select * from users")
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved list'
                });
        })
        .catch(function (err) {
            return next(err);
        })
}

function getOne(req, res, next) {
    db.any("select * from users where user_id ='" + req.params.id + "'")
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved list'
                });
        })
        .catch(function (err) {
            return next(err);
        })
}

function getOnebyPhone(req, res, next) {
    db.any("select * from users where phone ='" + req.params.phone + "'")
        .then(function (data) {
            if (Object.keys(data).length === 0)
                res.status(404)
                    .json({
                        status: 'failed',
                        data: data,
                        message: 'user does not exist'
                    });
            else
                res.status(200)
                    .json({
                        status: 'success',
                        data: data,
                        message: 'user exist'
                    });

        })
        .catch(function (err) {
            return next(err);
        })
}

function createUser(req, res, next) {
    db.none("INSERT INTO users(username, password, email, phone, fullname) VALUES (${username}, ${password}, ${email}, ${phone}, ${fullname})", req.body)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'successfuly created user'
                });
        })
        .catch(function (err) {
            return next(err);
        })
}
function editUserInfor(req, res, next) {
    db.none("UPDATE users SET username = ${username}, password = ${password}, email=${email}, phone=${phone}) where id = '" + req.params.id + "'", req.body)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'successfuly update user infor'
                });
        })
        .catch(function (err) {
            return next(err);
        })
}

function Delete(req, res, next) { }

function getEvents(req, res, next) {
    db.any("select * from events")
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved list'
                });
        })
        .catch(function (err) {
            return next(err);
        })
}

function getEventsbyUser(req, res, next) {
    db.any("select * from events where username = '" + req.params.username + "'", req.body)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved users events list'
                });
        })
        .catch(function (err) {
            return next(err);
        })
}

function createEvent(req, res, next) {
    db.none("INSERT INTO events(username, event_title, description, price, location, date_start, date_end, avatar) VALUES (${username}, ${event_title}, ${description}, ${price}, ${location}, ${date_start}, ${date_end},  ${avatar})", req.body)
        .then(function (data) {
          console.log('data',data)
            res.status(200)
                .json({
                    status: 'success',
                    message: 'successfuly created event'
                });
        })
        .catch(function (err) {
            return next(err);
        })
}

module.exports = {
    getList: getList,
    getOne: getOne,
    getOnebyPhone: getOnebyPhone,
    editUserInfor: editUserInfor,
    Delete: Delete,
    createUser: createUser,
    getEvents: getEvents,
    createEvent: createEvent,
    getEventsbyUser: getEventsbyUser,
    Login: Login,
}

