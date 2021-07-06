var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const owner = new Schema ({
    email: { type: String, required: true, index: { unique: true, sparse: true }},
    password:{ type: String, required: true},
    isActive:{type: Boolean, default:true},
    deviceToken:{ type: String, default:null},
    appVersion:{ type: String, default:null},
    deviceType:{type: String, default:null},
    userType:{ type: Number, default:1}
});

module.exports = mongoose.model('owner', owner);