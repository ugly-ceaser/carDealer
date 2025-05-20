const mysql = require("mysql2");

// Utility to ensure DB exists before pool creation
function ensureDatabaseExists(config) {
  return new Promise((resolve, reject) => {
    // Connect without database
    const connection = mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
    });
    connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${config.database}\``,
      (err) => {
        connection.end();
        if (err) return reject(err);
        resolve();
      }
    );
  });
}

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "benzworld",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Query the database
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (err, results) => {
      if (err) {
        console.error("Error executing query: ", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Export ensureDatabaseExists for use in index.js
module.exports = {
  ensureDatabaseExists,
  dbConfig,
  query,
};
