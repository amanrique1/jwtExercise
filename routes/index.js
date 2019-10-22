const express= require("express");
const mongoose=require("mongoose");

const app=express();
mongoose.connect('mongodb://localhost:27017/jwtDB', {useNewUrlParser: true,useUnifiedTopology: true })
.then(db=>console.log('DB is connected'))
.catch(err=> console.error(err));


//Middlewares
app.use(express.json());

//Routes
var HandlerGenerator = require("../handlegenerator.js");
var middleware = require("../middleware.js");

HandlerGenerator = new HandlerGenerator();
let router=express.Router();

router.get('/', middleware.checkToken, HandlerGenerator.index);

router.post( '/login', HandlerGenerator.login);

module.exports=router;