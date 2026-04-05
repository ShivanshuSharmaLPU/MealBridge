import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    // Build MongoDB URI
    const uri = `mongodb+srv://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASS)}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

    await mongoose.connect(uri);
    console.log("DB Connected");
  } catch (err) {
    console.error("DB Connection Error:", err);
    process.exit(1);
  }
};