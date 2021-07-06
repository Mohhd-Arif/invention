var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const option = new Schema ({
    name:{ type: String, required: [true,'name is required!!!'], index: { unique: true, sparse: true }},
    category:{ type: String, required: true},
    toppingGroup:{ type: Object, default:null},
    options:{type: Array, default:null},
    createdOn:{ type: Date, default: new Date},
    isDeleted:{type: Boolean, default:false}
});

module.exports = mongoose.model('option', option);