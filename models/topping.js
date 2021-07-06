var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topping = new Schema ({
    name:{ type: String, required: [true,'name is required!!'], index: { unique: true }},
    price:{ type: Number, required: true},
    createdOn:{ type: Date, default: new Date},
    isDeleted:{type: Boolean, default:false}
});

module.exports = mongoose.model('topping', topping);