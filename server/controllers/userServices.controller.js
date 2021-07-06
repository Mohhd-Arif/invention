const logger = require('../../config/logger');
const userService = require('../service/userServices');
const jwt = require('jsonwebtoken');
// const models = require('../../models');
// const Op = models.Sequelize.Op;
const bcrypt = require('bcrypt');
var uuid = require('uuid');


const userLogin = (req,res,next)=>{
  logger.trace("inside userLogin controller");
  var userData = req.body;
  userService.userLogin(userData)
  .then(data=>{
    logger.debug("data found",data);
    let payload = {
      "email" : data.email,
      "userId":data.userId,
    }
    data.token =  jwt.sign(payload,'my_secret_key',{ expiresIn: 60*60*24*30 });
    // data.password = null;
    delete data.password;
    // models.users.update({sessionKey:data.token},{where:{email:data.email}});
    res.json({"success":true, "data":data});
  }).catch(err=>{
    return res.status(err.code?err.code:404).json({"success":false,"message":err});
  });
}

const addUser = async (req,res,next)=>{
  logger.debug("inside addUser controller");
  let userData = req.body;
  const salt = await bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hashSync(userData.password, salt);
  userData.password = hashPassword;
  logger.debug(userData);
  userService.addUser(userData).then(data=>{
    return res.json({"success":true,"message":data});
  }).catch(err=>{
    return res.status(400).json({"success":false,"message":err});
  });
}

const getUserList = (req,res,next)=>{
  logger.debug("inside getUserList controller");
  sortByIndex = ['id','firstName','lastName','emailId','employeeId','organizationName'];
  sortByIndex = {
    'firstName':['firstName'],
    'lastName':['lastName'],
    'emailId':['email'],
    'employeeId':['employees','employeeId'],
    'organizationName':['employees','organizationName'],
  }
  let searchQry = req.query.searchQry?req.query.searchQry:0;
  let limit = req.query.limit?parseInt(req.query.limit):null;
  let page = req.query.page?parseInt(req.query.page):1;
  let sortBy = req.query.sortBy?sortByIndex[req.query.sortBy]:['id'];
  let order = req.query.order?req.query.order:'ASC';
  if(!sortBy || sortBy == 'undefined' || (order != 'ASC' && order != 'DESC')){
    return res.json({
      'success':false,
      'message':"sort by these keys only "+Object.keys(sortByIndex)+" and order by ASC or DESC"
    })
  }
  sortBy.push(order);
  if(searchQry){
    if(searchQry.length < 3){
      return res.json({"success":false,"message":"minimum lenght of query is 3 alphabets"});
    }
    searchQry = '%'+searchQry+'%';
  }else{
    searchQry = "";
  }
  let condition = {};
  userService.getUserList(condition,limit,page,searchQry,sortBy).then(data=>{
    return res.json({"success":true, "data":data});
  }).catch(err=>{
    logger.debug(err);
    return res.json({"success":false,"message":err});
  });
  
}



module.exports = {
  userLogin,
  addUser,
  getUserList,
};