import express from 'express';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

// Initialize express app
const app = express();

// Middleware for parsing JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Ensure the database is connected before loading routes and models
const startServer = async () => {
    try {
        // Wait for the database connection
        await connectDB();

        // After the DB is connected, import models and routes
        const { Static_Mates_Router } = await import('./routes/static_mates.route.js');

        // Use routes
        app.use('/static_mates', Static_Mates_Router);

        // Start the server after everything is ready
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        // Error handling middleware
        app.use(errorHandler);
    } catch (error) {
        console.error("Error starting server:", error);
    }
};

// Start the server only after DB connection is established
startServer();

export { app };
