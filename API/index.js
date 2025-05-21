const express = require('express');
const path = require('path');
require('dotenv').config();
const { ensureDatabaseExists, dbConfig, query } = require('./config/db');
const { createTablesSQL } = require('./config/initDb');
const cors = require('cors');
const seedProducts = require('./config/seedProducts');

const app = express();

// Body parsing middleware
app.use(express.urlencoded({ extended: true })); // For form submissions
app.use(express.json()); // For JSON payloads
app.use(
  cors({
    origin: 'http://localhost:5173', // Or your actual frontend domain
  })
);

// Static image serving middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routing for handling API requests
const apiRoutes = require('./routes/');
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging

  // Default status code and message
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong on the server.';

  // Specific JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token.';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired. Please log in again.';
  }

  // Set the status and send the JSON response
  res.status(statusCode).json({
    success: false,
    message: message,
    // Optionally, you might want to send the error details only in development
    // error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start server
async function startServer() {
  try {
    // Ensure DB exists before starting app
    await ensureDatabaseExists(dbConfig);
    console.log(`Database '${dbConfig.database}' checked/created.`);
    // Create tables if not exist (structure only)
    for (const sql of createTablesSQL) {
      await query(sql);
    }
    console.log('Tables checked/created.');

    // Seeded the product here
    const rows = await query('SELECT COUNT(*) AS count FROM products');
    const productCount = rows[0].count;

    if (productCount === 0) {
      console.log('Products table is empty. Seeding with initial data...');
      for (const product of seedProducts) {
        const {
          name,
          brand,
          model,
          year,
          price,
          color,
          mileage,
          transmission,
          fuel_type,
          description,
          image_url,
          featured,
        } = product;
        const insertSql = `
                    INSERT INTO products (name, brand, model, year, price, color, mileage, transmission, fuel_type, description, image_url, featured)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
        const params = [
          name,
          brand,
          model,
          year,
          price,
          color,
          mileage,
          transmission,
          fuel_type,
          description,
          image_url,
          featured,
        ];
        await query(insertSql, params);
      }
      console.log('Products table seeded successfully.');
    } else {
      console.log(
        `Products table already contains ${productCount} items. Skipping seeding.`
      );
    }

    const PORT = 2500;
    app.listen(PORT, () => {
      console.log(`Express app running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect or create database/tables:', err);
    process.exit(1);
  }
}

startServer();
