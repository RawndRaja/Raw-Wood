import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    Full_Name:{
        type:String,
        required:[true, 'Full Name is required']

    },
    username:{
        type:String,
        required:[true,'Username is required'],
        unique:true
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password is required'],
    },
    role:{
        type:String,
        default:"user"
    },
    Created_at:{
        type:Date,
        default:Date.now
    },
    intrest:{
        type:Array,
        default:[ 'Action', 'Comedy', 'drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Western' ],
    },
    Updated_at:{
        type:Date,
        default:Date.now
    },
    remember:{
        type:Boolean,
        default:false
    },
    forgetPassword:{
        type:Date
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

})
const User = mongoose.models.UserData || mongoose.model("UserData", userSchema);
export default User;