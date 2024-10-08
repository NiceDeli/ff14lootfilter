import express, {application} from 'express';
import { connectDB } from './config/db.js';
import {Static_Mates_Router} from "./routes/static_mates.route.js"

// Initialize express app with the correct type
const app: application = express();

// Middleware for parsing JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Ensure the database is connected before loading routes and models
const startServer = async () => {
    try {
        // Wait for the database connection
        await connectDB();

        // Start the server after everything is ready
        const PORT:number = +process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        app.use('/static_mates', Static_Mates_Router) 

    } catch (error) {
        console.error("Error starting server:", error);
    }
};

// Start the server only after DB connection is established
await startServer();

export { app };
