require('dotenv').config();

const connectDB=require('./database/db');
const app=require('./app');

app.listen(process.env.PORT||5000,()=>{
    console.log("Server is running......");  
})

connectDB();