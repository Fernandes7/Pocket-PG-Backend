import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: String,
    useremail: String,
    userpassword: String,
    isAdmin:{type:Boolean,default:false},
    userphoneno:{type:String},
    useraddress:{type:String},
    userdateofbirth:{type:String},
    usergender:{type:String},
    usercategory:{type:String}
  },
  { timestamps: true }
);

const UserSchema = mongoose.model("UsersData", userSchema);

export { UserSchema };
