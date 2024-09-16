import express, { application } from "express";
import { connectDB } from "./config/db.js";
import { Static_Mates_Router } from "./routes/static_mates.routes.js";
import { Loot_Table_Router } from "./routes/loot_table.routes.js";
import { Floor_Router } from "./routes/raid_floor.routes.js";

// Initialize express app with the correct type
const app = express();

// Middleware for parsing JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Ensure the database is connected before loading routes and models
const startServer = async () => {
  try {
    // Wait for the database connection
    await connectDB();

    // Start the server after everything is ready
    const PORT: number = +process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    //this is the url to get info for postman
    app.use("/static_mates", Static_Mates_Router);
    app.use("/loot_table", Loot_Table_Router);
    app.use("/floor", Floor_Router);
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

// Start the server only after DB connection is established
await startServer();

export { app };
