const express = require('express');
const validate = require('express-validation');
const controller = require('../controllers/restaurantServices.controller');
const router = express.Router();
const checkToken = require('../middlewares/secureRoutes')


router.route('/profile').get(controller.getRestaurantProfile);
router.route('/instanceAction/:status').put(checkToken,controller.updateRestaurantStatus);



module.exports = router;