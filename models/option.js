var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const option = new Schema ({
    name:{ type: String, required: true, [true,'name is required!!!']: { unique: true, sparse: true }},
    createdOn:{ type: Date, default: new Date},
    isDeleted:{type: Boolean, default:false}
});

module.exports = mongoose.model('option', option);