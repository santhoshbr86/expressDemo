const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const mymodel=mongoose.model('users', new Schema({name:String,password:String,email:String,phone:Number}));

export default mymodel;