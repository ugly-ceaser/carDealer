const { query } = require("../config/db");

// Define a list of allowed tables
const allowedTables = ["users", "orders", "products", "categories"];

// Function to validate table names
const isValidTable = (table) => {
  return allowedTables.includes(table);
};

// Fetch all the data from the database
const fetchAll = (table) => {
  return new Promise((resolve, reject) => {
    if (!isValidTable(table)) {
      return reject(new Error("Invalid table name"));
    }
    const sql = `SELECT * FROM ${table}`;
    query(sql)
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        reject(err);
      });
  });
};

// Fetch data by ID from the database
const fetchById = (table, id) => {
  return new Promise((resolve, reject) => {
    if (!isValidTable(table)) {
      return reject(new Error("Invalid table name"));
    }
    const sql = `SELECT * FROM ${table} WHERE id = ?`;
    query(sql, [id])
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        console.error("Error fetching data by ID: ", err);
        reject(err);
      });
  });
};

// Fetch data by column from the database
const fetchByColumn = (table, column, value) => {
  return new Promise((resolve, reject) => {
    if (!isValidTable(table)) {
      return reject(new Error("Invalid table name"));
    }
    const sql = `SELECT * FROM ${table} WHERE ${column} = ?`;
    query(sql, [value])
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        console.error("Error fetching data by column: ", err);
        reject(err);
      });
  });
};

// Insert data into the database
const create = (table, data) => {
  return new Promise((resolve, reject) => {
    if (!isValidTable(table)) {
      return reject(new Error("Invalid table name"));
    }
    const sql = `INSERT INTO ${table} SET ?`;
    query(sql, data)
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        console.error("Error inserting data: ", err);
        reject(err);
      });
  });
};

// Update data in the database
const update = (table, id, data) => {
  return new Promise((resolve, reject) => {
    if (!isValidTable(table)) {
      return reject(new Error("Invalid table name"));
    }
    const sql = `UPDATE ${table} SET ? WHERE id = ?`;
    query(sql, [data, id])
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        console.error("Error updating data: ", err);
        reject(err);
      });
  });
};

// Delete data from the database
const remove = (table, id) => {
  return new Promise((resolve, reject) => {
    if (!isValidTable(table)) {
      return reject(new Error("Invalid table name"));
    }
    const sql = `DELETE FROM ${table} WHERE id = ?`;
    query(sql, [id])
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        console.error("Error deleting data: ", err);
        reject(err);
      });
  });
};

// Search data in the database
const search = (table, column, value) => {
  return new Promise((resolve, reject) => {
    if (!isValidTable(table)) {
      return reject(new Error("Invalid table name"));
    }
    const sql = `SELECT * FROM ${table} WHERE ${column} LIKE ?`;
    query(sql, [`%${value}%`])
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        console.error("Error searching data: ", err);
        reject(err);
      });
  });
};

// Count data in the database
const count = (table) => {
  return new Promise((resolve, reject) => {
    if (!isValidTable(table)) {
      return reject(new Error("Invalid table name"));
    }
    const sql = `SELECT COUNT(*) as count FROM ${table}`;
    query(sql)
      .then((results) => {
        resolve(results[0].count);
      })
      .catch((err) => {
        console.error("Error counting data: ", err);
        reject(err);
      });
  });
};

// Fetch paginated data from the database
const paginate = (table, page, limit) => {
  return new Promise((resolve, reject) => {
    if (!isValidTable(table)) {
      return reject(new Error("Invalid table name"));
    }
    const offset = (page - 1) * limit;
    const sql = `SELECT * FROM ${table} LIMIT ?, ?`;
    query(sql, [offset, limit])
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        console.error("Error fetching paginated data: ", err);
        reject(err);
      });
  });
};

// Fetch data by multiple columns and values from the database
const fetchByMultipleColumns = (table, columns, values) => {
  return new Promise((resolve, reject) => {
    if (!isValidTable(table)) {
      return reject(new Error("Invalid table name"));
    }
    const sql = `SELECT * FROM ${table} WHERE ${columns.join(" = ? AND ")} = ?`;
    query(sql, values)
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        console.error("Error fetching data by multiple columns: ", err);
        reject(err);
      });
  });
};

module.exports = {
  fetchAll,
  fetchById,
  fetchByColumn,
  create,
  update,
  remove,
  search,
  count,
  paginate,
  fetchByMultipleColumns,
};
