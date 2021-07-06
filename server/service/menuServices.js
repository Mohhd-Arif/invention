const logger = require('../../config/logger');
const models = require('../../models');

const getToppings = () => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get toppings service");
            let toppings = await models.topping.find(
                {},
                {
                    __v:0
                }
            );
            resolve(toppings);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}

const getTopping = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get topping by id service");
            let topping = await models.topping.findOne(
                {_id},
                {
                    __v:0
                }
            );
            resolve(topping);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}

const addTopping = (toppingDetails) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside add topping service",{toppingDetails});
            var session = await models.topping.startSession();
            session.startTransaction();
            await models.topping.insertMany(toppingDetails,{ session });
            await session.commitTransaction();
            return resolve("Topping added successfully...");
        }
        catch (err) {
            logger.fatal(err);
            await session.abortTransaction();
            if(err.code == 11000){
                return reject({ code:422, message: "duplicate entry found" });
            }
            reject({ code:422, message: err.message });
        }
    })
}

const updateTopping = (_id,updateToppingObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside update topping service");
            let topping = await models.topping.findOneAndUpdate(
                {_id},
                updateToppingObj,
                {returnOriginal: false}
            );            
            return resolve(topping);
        }
        catch (err) {
            logger.fatal(err);
            if(err.code == 11000){
                return reject({ code:422, message: "Topping name already exists!!!" });
            }
            reject({ code:401, message: err.message });
        }
    })
}

const deleteTopping = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside disable topping service");
            let topping = await models.topping.deleteOne(
                {_id},
            );     
            logger.debug(topping);
            if(!topping.deletedCount){
                return reject({code:422, message:"Topping not found"});
            }       
            return resolve("Topping deleted successfully...");
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}

const getToppingGroups = () => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get topping groups service");
            let toppingGroups = await models.toppingGroup.find(
                {},
                {
                    __v:0
                }
            ).populate("toppings");
            resolve(toppingGroups);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}

const getToppingGroup = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get topping group by id service");
            let toppingGroup = await models.toppingGroup.findOne(
                {_id},
                {
                    __v:0
                }
            ).populate("toppings");
            resolve(toppingGroup);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}

const addToppingGroup = (toppingGroupDetails) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside add topping group service",{toppingGroupDetails});
            var session = await models.toppingGroup.startSession();
            session.startTransaction();
            //-----------------------------------------------------------------------------------------
            if(!toppingGroupDetails.toppings.length){
                return reject({ code:422, message: "no topping selected"});
            }
            else{
                let toppings = await models.topping.find(
                    {_id:toppingGroupDetails.toppings,isDeleted:false},
                    {
                        isDeleted:0,
                        __v:0
                    }
                );
                logger.debug(toppings);
                if(toppings && toppings.length == toppingGroupDetails.toppings.length){
                    toppingGroupDetails.toppingIds = toppingGroupDetails.toppings.join(',');
                    toppingGroupDetails.toppings = toppingGroupDetails.toppings;
                }
                else{
                    return reject({ code:422, message: "invalid topping selected"});
                }
            }
            //-----------------------------------------------------------------------------------------
            await models.toppingGroup.insertMany(toppingGroupDetails,{ session });
            await session.commitTransaction();
            return resolve("Topping Group added successfully...");
        }
        catch (err) {
            logger.fatal(err);
            await session.abortTransaction();
            if(err.code == 11000){
                return reject({ code:422, message: "duplicate entry found" });
            }
            reject({ code:422, message: err.message });
        }
    })
}

const updateToppingGroup = (_id,updateToppingGroupObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside update topping group service",{updateToppingGroupObj});
            //-----------------------------------------------------------------------------------------
            if(updateToppingGroupObj.toppings){//changes
                if(!updateToppingGroupObj.toppings.length){
                    return reject({ code:422, message: "no topping selected"});
                }
                else{
                    let toppings = await models.topping.find(
                        {_id:updateToppingGroupObj.toppings,isDeleted:false},
                        {
                            isDeleted:0,
                            __v:0
                        }
                    );
                    logger.debug(toppings);
                    if(toppings && toppings.length == updateToppingGroupObj.toppings.length){
                        updateToppingGroupObj.toppingIds = updateToppingGroupObj.toppings.join(",");
                        updateToppingGroupObj.toppings = toppings;
                    }
                    else{
                        return reject({ code:422, message: "invalid topping selected"});
                    }
                }
            }
            
            //-----------------------------------------------------------------------------------------
            let toppingGroup = await models.toppingGroup.findOneAndUpdate(
                {_id},
                updateToppingGroupObj,
                {returnOriginal: false}
            ).populate('toppings');
            logger.debug(toppingGroup)        
            return resolve(toppingGroup);
        }
        catch (err) {
            logger.fatal(err);
            if(err.code == 11000){
                return reject({ code:422, message: "Topping group already exists!!!" });
            }
            reject({ code:401, message: err.message });
        }
    })
}

const deleteToppingGroup = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside disable topping group service");
            let toppingGroup = await models.toppingGroup.deleteOne(
                {_id},
            );     
            logger.debug(toppingGroup);
            if(!toppingGroup.deletedCount){
                return reject({code:422, message:"Topping group not found"});
            }   
            return resolve("Topping group deleted successfully...");
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}


module.exports = {
    addTopping,
    getToppings,
    getTopping,
    updateTopping,
    deleteTopping,
    getToppingGroups,
    getToppingGroup,
    addToppingGroup,
    updateToppingGroup,
    deleteToppingGroup
}