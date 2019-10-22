const express=require("express");
const router= express.Router();

var HandlerGenerator = require("../handlegenerator.js");
var middleware = require("../middleware.js");

HandlerGenerator = new HandlerGenerator();

router.post( '/', middleware.checkToken,HandlerGenerator.createUser);
router.put( '/', middleware.checkToken,HandlerGenerator.updateUser);
router.get( '/', middleware.checkToken,HandlerGenerator.getUsers);

module.exports=router;