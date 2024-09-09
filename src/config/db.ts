import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';  // Import from sequelize-typescript for decorators
import { StaticMate } from '../models/static_mates.model.js' //Bastardized way of doing it, but it forces it so that .js is always imported
import { LootTable } from '../models/loot_table.model.js'
import { Floor } from '../models/floor.model.js'

dotenv.config(); // Load environment variables from .env

// Initialize Sequelize instance with models
const sequelize = new Sequelize(process.env.SUPABASE_URI as string, {
  dialect: 'postgres',
  logging: (msg) => {
    // Apply green color using ANSI escape codes
    const greenText = `\x1b[32m${msg}\x1b[0m`; // Green color
    const unwantedPatterns = [
      /FROM information_schema\.tables/,  // Table existence checks
      /FROM pg_class/,                    // Index and table metadata retrieval
      /FROM pg_index/,                    // Index metadata
      /FROM pg_enum/,                     // Enum type fetching
      /FROM pg_type/,                     // Enum metadata related to types
      /FROM pg_catalog\.pg_namespace/,    // System namespace queries
      /SELECT i\.relname AS name/,        // Specific pattern for index fetching
      /SELECT 1\+1 AS result/,            // Specific pattern to exclude this exact query
    ];

    // Log only if the message does not match any unwanted patterns
    if (!unwantedPatterns.some((pattern) => pattern.test(msg))) {
      console.log(`\x1b[33m${`[Sequelize Log]:`}\x1b[0m ${greenText}`);
    }
  },
  dialectOptions: { 
    ssl: {
      require: true, // Ensure SSL is required
      rejectUnauthorized: false, // Skip SSL certificate validation (adjust based on security needs)
    },
  },
  models: [StaticMate, Floor, LootTable],  // Register the StaticMate model LootTable
});


// Function to connect to the database
export const connectDB = async () => {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('Connected to the database');
    
    // Sync models to the database
    await sequelize.sync();
    console.log('Database synchronized');
    
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the process with failure
  }
};

// Export sequelize instance for use in models
export { sequelize };
