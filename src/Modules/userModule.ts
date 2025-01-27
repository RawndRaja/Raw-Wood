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
    favourate:[
        {
            id: {
                type: String,
                required: true
              },
              title: {
                type: String,
                required: true
              },
              genre: [{
                id: Number,
                name: String
              }]
            
    }],
    role:{
        type:String,
        default:"member"
    },
    status:{
        type:String,
        default:"authorized"
    },
    Created_at:{
        type:Date,
        default:Date.now
    },
    intrest:[
        {
            genre:[
                {
                    id: String,
                    name: String
                }
            ]
        }
    ],
    Updated_at:{
        type:Date,
        default:Date.now
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