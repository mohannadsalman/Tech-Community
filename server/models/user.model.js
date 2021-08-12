const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName : {type:String,required:true,trim:true,minLength:[2,"user name should be 2 or more char"]},
    email:{type:String,required:true,trim:true,unique:true,match:["REGEX","Please provird a valid email"]},
    password:{type:String,required:true,trim:true,minLength:[8,"password should be 8 or more char"],select:false},
    followedTechnology:[{type:mongoose.Types.ObjectId, ref:'Technology'}],
    userRole:{type:String,enum:["recruter","user"],required:true},
    company:{type:String},
    post:[{type:mongoose.Types.ObjectId, ref:'Post'}],
    comment:[{type:mongoose.Types.ObjectId, ref:'Comment'}],
    activity:[{technologyId:String,numAction:{type:Number,default:0},_id: false},{ _id:false}]
},{ timestamps: true });

module.exports.User = mongoose.model('User',UserSchema);