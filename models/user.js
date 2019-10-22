const mongoose= require('mongoose');
const {Schema}=mongoose;
mongoose.set('useFindAndModify', false);

const User= new Schema({
    username:String,
    password:String,
    role:String
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports=mongoose.model('users',User);