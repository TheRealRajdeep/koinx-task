import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {
    // Connection options
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    // Event listeners
    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );
    mongoose.connection.on("error", (err) =>
      console.error("Connection error:", err)
    );
    mongoose.connection.on("disconnected", () =>
      console.log("Database Disconnected")
    );

    // Connect to database
    await mongoose.connect(`${process.env.MONGODB_URI}/db1`, options);
  } catch (error) {
    console.error("Could not connect to database:", error);
    process.exit(1);
  }
};

export default connectDB;
