import mongoose from "mongoose";

const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB", error.message);
    process.exit(1);
  }
};

export default mongoDB;
