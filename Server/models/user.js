const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, require: true },
    fullname: {type: String},
    phone: {type: Number, require: true },
    avatar: {type: String},
    joined : { type : Date, default: Date.now }
});

module.exports =  mongoose.model('User', userSchema);