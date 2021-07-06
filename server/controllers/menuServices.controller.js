const logger = require('../../config/logger');
const menuService = require('../service/menuServices');

const getToppings = (req,res,next)=>{
    logger.trace("inside get toppings controller");
    menuService.getToppings().then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const getTopping = (req,res,next)=>{
    let id = req.params.id
    logger.trace("inside get topping by id controller",{id});
    menuService.getTopping(id).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const addTopping = (req,res,next)=>{
    let toppingDetails = req.body.toppingDetails;
    logger.trace("inside add topping controller",toppingDetails);
    menuService.addTopping(toppingDetails).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const updateTopping = (req,res,next)=>{
    let updateToppingObj = req.body;
    let id = req.params.id;
    logger.trace("inside update topping controller",id,updateToppingObj);
    menuService.updateTopping(id,updateToppingObj).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const deleteTopping = (req,res,next)=>{
    let id = req.params.id;
    logger.trace("inside delete topping controller",id);
    menuService.deleteTopping(id).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}


const getToppingGroups = (req,res,next)=>{
    logger.trace("inside get topping groups controller");
    menuService.getToppingGroups().then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const getToppingGroup = (req,res,next)=>{
    let id = req.params.id
    logger.trace("inside get topping by id controller",{id});
    menuService.getToppingGroup(id).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const addToppingGroup = (req,res,next)=>{
    let toppingDetails = req.body;
    logger.trace("inside add topping controller",toppingDetails);
    menuService.addToppingGroup(toppingDetails).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const updateToppingGroup = (req,res,next)=>{
    let updateToppingGroupObj = req.body;
    let id = req.params.id;
    logger.trace("inside update topping group controller",id,updateToppingGroupObj);
    menuService.updateToppingGroup(id,updateToppingGroupObj).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const deleteToppingGroup = (req,res,next)=>{
    let id = req.params.id;
    logger.trace("inside delete topping group controller",id);
    menuService.deleteToppingGroup(id).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
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