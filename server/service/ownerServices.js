const logger = require('../../config/logger');
const models = require('../../models');

const ownerLogin = (ownerCreds) => {
    logger.trace("inside owner login", { ownerCreds });
    return new Promise(async (resolve, reject) => {
        try {
            let condition = {
                email: ownerCreds.email,
            }
            let ownerData = await models.owner.findOneAndUpdate(
                condition,
                {
                    deviceToken:ownerCreds.deviceToken?ownerCreds.deviceToken:null,
                    appVersion:ownerCreds.appVersion?ownerCreds.appVersion:null,
                    deviceType:ownerCreds.deviceType?ownerCreds.deviceType:null,
                },
                {returnOriginal: false}
            );
            logger.debug({ownerData});

            if (ownerData) {
                if (ownerData.password == ownerCreds.password) {
                    let restaurantData = await models.restaurant.findOne(
                        {},
                        {
                            _id: 0,
                            __v: 0,
                        }
                    ).exec();
                    ownerData = Object.assign(JSON.parse(JSON.stringify(ownerData)),JSON.parse(JSON.stringify(restaurantData)))
                    resolve(ownerData);
                }
                else {
                    reject({ code:200, message:"You entered wrong Email or Password" });
                }
            }
            else {
                reject({ code:200, message:"You entered wrong Email or Password" });
            }
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    });
};

let ownerResetPassword = (passwordBody) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside reset password service", passwordBody);
            let condition = {
                email: passwordBody.email,
            }
            let ownerData = await models.owner.findOne(
                condition,
            );
            logger.debug(ownerData);
            if(ownerData){
                if (ownerData.password == passwordBody.oldPassword) {
                    await models.owner.update({ _id: ownerData._id }, { $set: { password: passwordBody.newPassword } });
                    resolve("Password Reset Successfully...");
                }
                else {
                    reject({ code: 401, message: "Invalid Old Password!!!" })
                }
            }
            else{
                reject({ code: 401, message: "Invalid Email Id!!!" })
            }
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}

const ownerEditProfile = (condition,profileBody) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside edit profile service", {condition,profileBody});
            if(Object.keys(profileBody).length){
                // await models.restaurant.updateOne({}, { $set: profileBody });
                let restaurantProfile = await models.restaurant.findOneAndUpdate(
                    {},
                    { $set: profileBody },
                    {returnOriginal: false},
                );
                logger.debug(restaurantProfile);
                resolve(restaurantProfile);
            }
            else{
                reject({ code:400, message: "No parameters provided!!!" });
            }
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}

module.exports = {
    ownerLogin,
    ownerResetPassword,
    ownerEditProfile
}