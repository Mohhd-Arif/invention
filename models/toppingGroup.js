var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toppingGroup = new Schema ({
    name:{ type: String, required: [true,'name is required!!!'], index: { unique: true, sparse: true }},
    price:{ type: Number, required: true},
    toppings:[{ type: Schema.Types.ObjectId, ref:'topping'}],
    toppingIds:{ type: String, required: true, index: { unique: true, sparse: true }},
    createdOn:{ type: Date, default: new Date},
    isDeleted:{type: Boolean, default:false}
});

module.exports = mongoose.model('toppingGroup', toppingGroup);