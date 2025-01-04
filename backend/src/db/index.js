import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const instance = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log(`\nMONGODB CONNECTED !! AT HOST : ${instance.connection.host}`);
  } catch (error) {
    console.log("ERROR CONNECTING TO THE MONGODB :", error);
    process.exit(1);
  }
};

export default connectDB;
