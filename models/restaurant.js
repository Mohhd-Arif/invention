var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurant = new Schema ({
    restaurantName:{ type: String, required: true},
    location:{ type: String, required: true},
    shortDescription:{ type: String, required: true},
    image:{ type: String, required: true},
    createdOn:{ type: Date, default: new Date},
    isOnline:{ type: Boolean, default: true}
});

module.exports = mongoose.model('restaurant', restaurant);