const mysql = require("mysql2");

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "benzworld",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

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

module.exports = {
  query,
};
