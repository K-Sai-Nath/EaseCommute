const Trips=require("../models/Offer_Trip")
const Get_Trips=async (req,res)=>{
    const {from,to,passengers}=req.body
    try{
        const trips=await Trips.find({source:from,destination:to,seats:{$gte:passengers}})
        console.log(trips)
        res.send(trips)
    }
    catch(e){
        console.log(e)
    }
}
module.exports=Get_Trips