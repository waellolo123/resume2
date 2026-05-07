import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO);
    console.log('db connected');
  } catch (error) {
    console.log("error connecting to db", error);
    process.exit(1);
  }
}

export default connectDB;
