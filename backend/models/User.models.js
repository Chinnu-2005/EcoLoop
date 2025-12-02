const mongoose=require('mongoose');
const {Schema}=mongoose;
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const nanoid=require('nanoid');

const userSchema=new Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            index:true
        },
        password:{
            type:String,
            required:[true,'Password is required']
        },
        coverImage:{
            type:String
        },
        refreshToken:{
            type:String
        },
        role:{
            type:String,
            enum:['citizen','admin','center']
        },
        points:{
            type:Number,
            default:0
        },
        uniqueID:{
            type:String
        }

    },{
        timestamps:true
    }
)

userSchema.pre('save',async function(next){
    
    if(this.isModified('password')){
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
    }
    
    if(this.isModified('uniqueID')){
        if(this.role==='citizen') this.uniqueID='CITI-'+nanoid.nanoid(6);
        if(this.role==='admin') this.uniqueID='ADMIN-'+nanoid.nanoid(6);
        if(this.role==='center') this.uniqueID='CENT-'+nanoid.nanoid(6);
    }

    next();
})


userSchema.methods.validatePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAuthToken=async function(){
    return jwt.sign(
        {
            _id:this._id,
            name:this.name,
            email:this.email,
            role:this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.methods.generateRefreshToken=async function(){
    return jwt.sign(
        {
            _id:this._id,
            name:this.name,
            email:this.email,
            role:this.role
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



module.exports=mongoose.model('User',userSchema);