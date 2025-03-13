const Trip_Schema=require("../models/Offer_Trip")
const Offer_Trip=async (req,res)=>{
    const {name,number,source,destination,date,time,seats_available,car_number}=req.body;
    res.status(200).json({message:"Ok"})
    const trip=new Trip_Schema({name,number,source,destination,date,time,seats:seats_available,car_number})
    await trip.save()
}
module.exports=Offer_Trip;