import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      dbName: process.env.DB_NAME,
    });
    console.log(`Connected to: ${con.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};
export default connectDB;
