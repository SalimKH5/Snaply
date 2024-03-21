import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"




const userSchema = new Schema(
  {
  
    email:{
      type:String,
      required:true
    },
    password:{
      type:String,
      required:true
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save",function (next){

  const user=this;


  if(this.isModified('password')|| this.isNew){
      bcrypt.genSalt(10,function (salteError,salt){
            if(salteError){
              return next();
            }else{
              bcrypt.hash(user.password,salt,function (hashError,hash){
                if(hashError){
                  return next(hashError);
                }


                user.password=hash;
                next();
              })
            }
      })
  }else{
    return next();
  }
})




userSchema.methods.comparePassword = function (password ,callback) {
    bcrypt.compare(password, this.password, function (error, isMatch) {
        if (error) {
            return callback(error);
        } else {
            return callback(null, isMatch);
        }
    });
};




let Users = mongoose.models.Users || mongoose.model("users", userSchema);

export default Users;