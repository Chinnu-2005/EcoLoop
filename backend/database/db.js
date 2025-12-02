const mongoose=require('mongoose');

const connectDB=async()=>{
    try{
        const connectionInstance=await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`);
        console.log(`Mongo DB Connected!! \n Host : ${connectionInstance.connection.host}`);
    }catch(err){
        console.log("Connection Error :",error);
        process.exit(1);
    }
}

module.exports=connectDB;