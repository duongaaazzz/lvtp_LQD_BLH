const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, require: true },
    description: {type: String },
    price: {type: Number, default: 0 },
    avatar: {type: String, default: 'https://lh3.googleusercontent.com/tENLeNva499pxauBN1i5cOgwoZDAJk2R_F4R8PCVdw-YDUNk-8KQqUOLbiYWS97UkXn1Pw7dGw=w640-h400-e365' },
    type: [],
    location: {type:String},
    created_by: {type: String, ref: 'User'},
    userlist: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', default:''}],
    time_start:  { type : Date, default: Date.now },
    time_end:  { type : Date, default: Date.now },
  //  comments: {type: Array, default: null},
    comments: [
    {
        username: {type: String, ref: 'User'},
        comment: {type:String}, 
        at: { type : Date, default: Date.now }
    }],
});

module.exports =  mongoose.model('Event', eventSchema);