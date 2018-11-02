const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, require: true },
    description: {type: String },
    price: {type: Number, default: 0 },
    avatar: {type: String },
    type: [{type: String }],
    created_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    userlist: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', default:''}],
    time_start:  { type : Date, default: Date.now },
    time_end:  { type : Date, default: Date.now },
});

module.exports =  mongoose.model('Event', eventSchema);