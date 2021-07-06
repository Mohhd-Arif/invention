const logger = require('../../config/logger');
const models = require('../../models');
const bcrypt = require('bcrypt');
const {sendConfirmationEmail} = require('../helpers/mailer');
const { reject } = require('bcrypt/promises');



const isUserExist = (data)=>{
  logger.debug("inside is user exist");
  return new Promise(async (resolve,reject)=>{
    let condition = {
      email:data.email,
    }
    let userData = await models.users.findOne({attributes:['email'],where:condition});
      if(userData){
        resolve(true);
      }
      else{
        resolve(false);
      }
  });
}

const isEmployeeExist = (condition) =>{
  logger.debug("inside is employee exist");
  return new Promise(async (resolve,reject)=>{
    try{
      let employee = await models.employees.findOne({where:condition});
      if(employee){
        resolve(true);
      }
      else{
        resolve(false);
      }
    }
    catch(err){
      logger.debug(err);
      reject(err);
    }
  })
}

const userLogin = (userCreds)=>{
  logger.trace("inside user login",{userCreds});
  return new Promise(async (resolve,reject)=>{
    try{
      let condition = {
        email:userCreds.email,
      }
      let userData = await models.user.find(condition,{password:1,_id:0,email:1,name:1,userId:1,isActive:1});
      // logger.debug(userData);
      userData = JSON.parse(JSON.stringify(userData[0]));
      if(userData){
        if(userData.isActive){
          if(userData && bcrypt.compareSync(userCreds.password, userData.password)){
            delete userData.password;
            resolve(userData);
          }
          else{
            reject("Invalid Password");
          }
        }
        else{
          reject({code:500,errMsg:"User is not active"});
        }
      }
      else{
        reject("Invalid Email ID");
      }
    }
    catch(err){
      logger.fatal(err);
    }
  });
};


const addUser = (userData)=>{
  return new Promise(async (resolve,reject)=>{
    logger.debug("inside add user service",{userData});
    try{
      await models.user.create(
        userData
      );
      // await sendConfirmationEmail(userData.userId);
      logger.debug("added successfully");
      resolve("user added successfully");
    }
    catch(err){
      logger.fatal(err);
      reject(err.message);
    }
  });
};

const addOrganization = (addedUserOrgData)=>{
  return new Promise(async (resolve,reject)=>{
    try{
      logger.debug('inside add organization',addedUserOrgData);
      let orgData = addedUserOrgData;
      let dataSet = {userId:orgData.id,organizationName:orgData.organizationName,employeeId:orgData.employeeId};
      if(await isEmployeeExist({organizationName:dataSet.organizationName,employeeId:dataSet.employeeId})){
        models.users.destroy({where:{id:addedUserOrgData.id}});
        return reject("employeeId already taken");
      }
      await models.employees.create(dataSet);
      resolve();
    }
    catch(err){
      logger.debug(err);
      models.users.destroy({where:{id:addedUserOrgData.id}});
      reject("service denied try again");
    }
  })
}


const getUserList = (condition,limit,page,searchQry,order)=>{
  logger.debug("inside get user list",condition);
  return new Promise((resolve,reject)=>{

    if(searchQry){
      // searchQry = "%"+searchQry+"%"
      condition = Object.assign(condition,{[Op.or] : [
        {"firstName":{
          [Op.like]:searchQry
        }},
        {"lastName":{
          [Op.like] : searchQry
        }},
        {'$employees.employeeId$':{
          [Op.like]: searchQry
        }},
      ]})
    }

    models.users.findAndCountAll({
      subQuery: false,
      attributes:['id','firstName','lastName','email',
      [sequelize.col('employees.organizationName'),'organizationName'],
      [sequelize.col('employees.employeeId'),'employeeId'] 
    ],
      include:[{
        model:models.employees, 
        attributes:[],
        as: 'employees',
      }],
      where:condition,
      order:[order],
      offset:page?(page-1)*limit:0,
      limit:limit?limit:null,
      raw:true
    })
    .then( async data=>{
      if(data){
        resolve(data);
      }
      else{
        reject("no User exist");
      }
    })
    .catch(err=>reject(err));
  });
};

module.exports = {
  userLogin,
  addUser,
  getUserList,
};
