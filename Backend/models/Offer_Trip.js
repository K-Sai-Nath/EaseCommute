const mongoose=require("mongoose")
const Trip_Schema=mongoose.Schema({
    name:{type:String,required:true,unique:true},
    number:{type:String,required:true,unique:true},
    source:{type:String,required:true},
    destination:{type:String,required:true},
    date:{type:String,required:true},
    time:{type:String,required:true},
    seats:{type:Number,required:true},
    car_number:{type:String,required:true},
})
module.exports=mongoose.model("Trip_Schema",Trip_Schema)