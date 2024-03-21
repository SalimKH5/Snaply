import mongoose from "mongoose";

const connectMongoDB = async () => {
    const URI=process.env.MONGODB_URI
    if(!URI){
        throw new Error('please provide the mongoapi')
    }
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;