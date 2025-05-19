const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

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
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express app running at http://localhost:${PORT}`);
});
