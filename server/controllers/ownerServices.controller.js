const logger = require('../../config/logger');
const ownerService = require('../service/ownerServices');
const jwt = require('jsonwebtoken');

const ownerLogin = (req,res,next)=>{
  logger.debug("inside ownerLogin controller");
  var ownerData = req.body;
  ownerService.ownerLogin(ownerData)
  .then(data=>{
    logger.debug("data found",data);
    let payload = {
      "email" : data.email,
      "userId":data._id,
    }
    data.token =  jwt.sign(payload,'my_secret_key',{ expiresIn: 60*60*24*30 });
    // data.password = null;
    delete data.password;
    // models.users.update({sessionKey:data.token},{where:{email:data.email}});
    res.status(200).json({"success":true, "data":data});
  }).catch(err=>{
      logger.fatal(err);
    return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
  });
}

const ownerResetPassword = (req,res,next)=>{
    logger.debug("inside owner reset password controller");
    var passwordBody = req.body;
    ownerService.ownerResetPassword(passwordBody)
    .then(data=>{
      res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
      return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const ownerEditProfile = (req,res,next)=>{
    logger.debug("inside owner edit profile controller",req.payLoad);
    ownerService.ownerEditProfile({_id:req.payLoad.userId},req.body).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

module.exports = {
    ownerLogin,
    ownerResetPassword,
    ownerEditProfile
}