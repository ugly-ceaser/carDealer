const express = require("express");
const path = require("path");
require("dotenv").config();
const { ensureDatabaseExists, dbConfig, query } = require("./config/db");
const { createTablesSQL } = require("./config/initDb");
const cors = require("cors");

const app = express();

// Allow CORS for React frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust if your React dev server runs elsewhere
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.urlencoded({ extended: true })); // For form submissions
app.use(express.json()); // For JSON payloads

// Static image serving middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routing for handling API requests
const apiRoutes = require("./routes/");
app.use("/api", apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: {
      message: err.message,
      status: err.status || 500,
    },
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
    console.log("Tables checked/created.");
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Express app running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect or create database/tables:", err);
    process.exit(1);
  }
}

startServer();
