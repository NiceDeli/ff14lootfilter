// config/db.js
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config(); // Load environment variables from .env

// Initialize Sequelize instance
const sequelize = new Sequelize(process.env.SUPABASE_URI, {
    dialect: 'postgres',
    logging: false, // Optional: disable logging of SQL queries
    dialectOptions: {
      ssl: {
        require: true, // Ensure SSL is required
        rejectUnauthorized: false, // Skip SSL certificate validation (adjust based on security needs)
      },
    },
  });

// Function to connect to the database
export const connectDB = async () => {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the process with failure
  }
};

// Export sequelize instance for use in models
export { sequelize };
