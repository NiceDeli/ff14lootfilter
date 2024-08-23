// config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AutoIncrementFactory from 'mongoose-sequence'

dotenv.config(); // Load environment variables from .env
let AutoIncrement;

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
  
        // Initialize AutoIncrement only once and export it
        if (!AutoIncrement) {
            // @ts-ignore
            AutoIncrement = AutoIncrementFactory(connection);
        }
        console.log("Connected to database");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit with failure
    }
};

export { AutoIncrement };