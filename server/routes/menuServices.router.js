const express = require('express');
const validate = require('express-validation');
const controller = require('../controllers/menuServices.controller');
const router = express.Router();
const checkToken = require('../middlewares/secureRoutes')

router.route('/addToppings').post(checkToken,controller.addTopping);
router.route('/getToppings').get(checkToken,controller.getToppings);
router.route('/getTopping/:id').get(checkToken,controller.getTopping);
router.route('/updateTopping/:id').put(checkToken,controller.updateTopping);
router.route('/deleteTopping/:id').delete(checkToken,controller.deleteTopping);


router.route('/addToppingGroups').post(checkToken,controller.addToppingGroup);
router.route('/getToppingGroups').get(checkToken,controller.getToppingGroups);
router.route('/getToppingGroup/:id').get(checkToken,controller.getToppingGroup);
router.route('/updateToppingGroup/:id').put(checkToken,controller.updateToppingGroup);
router.route('/deleteToppingGroup/:id').delete(checkToken,controller.deleteToppingGroup);
module.exports = router;