import mongoose from "mongoose";

//Schema Design
const userSchema = new mongoose.Schema(
  {
    username: String,
    useremail: String,
    userpassword: String,
    isAdmin:{type:Boolean,default:false}
  },
  { timestamps: true }
);

//Model(Table) creation
const UserSchema = mongoose.model("UsersData", userSchema);

export { UserSchema };
