// Import statements using ES module syntax
import express from 'express';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import { Static_Mates_Router } from './routes/static_mates.route.js';

// Initialize express app
const app = express();

// Middleware for parsing JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to the database
connectDB().then(() => {
    console.log("Database connected");

    // Routes are initialized AFTER the database is connected
    app.use('/static_mates', Static_Mates_Router);

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

    // Error handling middleware should be placed after routes
    app.use(errorHandler);
}).catch(err => {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit on failure
});

// Export app for testing or other purposes
export { app };
