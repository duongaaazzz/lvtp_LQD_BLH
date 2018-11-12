const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, require: true },
    fullname: {type: String},
    phone: {type: Number, require: true },
    avatar: {type: String},
    joined : { type : Date, default: Date.now },
    email: {type: String},
    gender:  {type: String, default: 'other'},
    birthday: {type: Date, default: Date.now},
    about: {type: String},
});

module.exports =  mongoose.model('User', userSchema);