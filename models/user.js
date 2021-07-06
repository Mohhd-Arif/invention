var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema ({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true, index: { unique: true, sparse: true }},
    password:{ type: String, required: true},
    address:{ type: String, required: true},
    city:{ type: String, required: true},
    isDelete:{type:Boolean, default:false},
    passcode:{ type: String, required: true}
});

module.exports = mongoose.model('user', user);