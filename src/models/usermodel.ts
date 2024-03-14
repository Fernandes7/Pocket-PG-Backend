import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: String,
    useremail: String,
    userpassword: String,
    isAdmin:{type:Boolean,default:false}
  },
  { timestamps: true }
);

const UserSchema = mongoose.model("UsersData", userSchema);

export { UserSchema };
