const jwt = require('jsonwebtoken');
const logger = require('../../config/logger')
// let models = require('../../models')

module.exports = function checkToken(req, res, next) {
	var token = req.headers['authorization'];
	logger.info("New token " + token); 
	if(token) {
		token = req.headers['authorization'].slice(7);
		jwt.verify(token, 'my_secret_key',async (err,decode)=>{
			logger.info("JWT decode: " + JSON.stringify(decode));
			if(err) {
				logger.info("JWT err: " + err);
				res.status(401).json({"success":false,
					"message":"TOKEN EXPIRED",
				});
			} else {
				req.payLoad = decode;
				// let isvalidToken = await models.users.findOne({attributes:['id'],where:{id:decode.id,sessionKey:token}});
				if(true){
					next();
				}
				else{
					res.json({
						"success":false,
						"status":500,
						"data":"TOKEN EXPIRED LOGIN AGAIN",
						"error":"TOKEN EXPIRED LOGIN AGAIN"
					});	
				}
			}
		});
	} else {
		res.status(401).json({"success":false,
			"message":"NO TOKEN PROVIDED",
		});
	}

};