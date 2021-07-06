const logger = require('../../config/logger');
const models = require('../../models');

const getRestaurantProfile = () => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get restaurant profile service");
            let restaurantProfile = await models.restaurant.findOne(
                {},
                {
                    _id: 0,
                    __v:0
                }
            );
            resolve(restaurantProfile);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}


const updateRestaurantStatus = (status) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside update restaurant status service",{status});
            await models.restaurant.update(
                {},
                {isOnline:status},
            );
            if(status){
                return resolve("instance is online");
            }
            return resolve("instance is offline");
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}


module.exports = {
    getRestaurantProfile,
    updateRestaurantStatus
}