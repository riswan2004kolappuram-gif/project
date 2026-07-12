import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");
};

export default connectDB;