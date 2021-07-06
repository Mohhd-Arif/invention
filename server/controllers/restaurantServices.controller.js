const logger = require('../../config/logger');
const restaurantService = require('../service/restaurantServices');

const getRestaurantProfile = (req,res,next)=>{
    logger.trace("inside get restaurant profile controller");
    restaurantService.getRestaurantProfile().then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const updateRestaurantStatus = (req,res,next)=>{
    let status = parseInt(req.params.status);
    logger.trace("inside update restaurant status controller",status);
    restaurantService.updateRestaurantStatus(status).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

module.exports = {
    getRestaurantProfile,
    updateRestaurantStatus
}