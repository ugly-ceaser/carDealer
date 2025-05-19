const {
  fetchAll,
  fetchById,
  fetchByColumn,
  create,
  update,
  remove,
  search,
  fetchByMultipleColumns,
} = require("../utils/helpers");
const table = "products";

//add new car
const addProduct = async (req, res, next) => {
  try {
    const {
      name,
      brand,
      model,
      year,
      price,
      color,
      mileage,
      featured,
      transmission,
      fuel_type,
      description,
    } = req.body;

    if (!name || !brand || !model || !year || !price) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const data = {
      name,
      brand,
      model,
      year,
      price,
      color: color || null,
      mileage: mileage || null,
      featured: featured || 0,
      transmission: transmission || null,
      fuel_type: fuel_type || null,
      description: description || null,
      image_url: req.imagePath || null,
    };

    const result = await create(table, data);
    if (!result) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to add product" });
    }
    // Fetch the newly created product
    const newProduct = await fetchById(table, result.insertId);
    newProduct[0].featured = newProduct[0].featured === 1 ? true : false;

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: {
        product: newProduct[0],
      },
    });
  } catch (err) {
    next(err);
  }
};

// fetch featured products
const fetchFeaturedProducts = async (req, res) => {
  try {
    const products = await fetchByColumn(table, "featured", 1);
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No featured products found",
      });
    }
    products.forEach((product) => {
      product.featured = product.featured === 1 ? true : false;
    });
    res.status(200).json({
      success: true,
      data: {
        products,
      },
    });
  } catch (err) {
    next(err);
  }
};

// fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const products = await fetchAll(table);
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }
    products.forEach((product) => {
      product.featured = product.featured === 1 ? true : false;
    });
    res.status(200).json({
      success: true,
      data: {
        products,
      },
    });
  } catch (err) {
    next(err);
  }
};

// fetch product by id
const fetchProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await fetchById(table, productId);
    if (product.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    product[0].featured = product[0].featured === 1 ? true : false;
    res.status(200).json({
      success: true,
      data: {
        product: product[0],
      },
    });
  } catch (err) {
    next(err);
  }
};

// update product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      name,
      brand,
      model,
      year,
      price,
      color,
      mileage,
      featured,
      transmission,
      fuel_type,
      description,
    } = req.body;

    const data = {
      name,
      brand,
      model,
      year,
      price,
      color: color || null,
      mileage: mileage || null,
      featured: featured || 0,
      transmission: transmission || null,
      fuel_type: fuel_type || null,
      description: description || null,
      image_url: req.imagePath || null,
    };

    const result = await update(table, productId, data);
    if (!result) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to update product" });
    }
    // Fetch the updated product
    const updatedProduct = await fetchById(table, productId);
    updatedProduct[0].featured =
      updatedProduct[0].featured === 1 ? true : false;

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: {
        product: updatedProduct[0],
      },
    });
  } catch (err) {
    next(err);
  }
};

// delete product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await remove(table, productId);
    if (!result) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete product" });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

// search products
const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query parameter is required",
      });
    }
    const products = await search(table, "name", query);
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }
    products.forEach((product) => {
      product.featured = product.featured === 1 ? true : false;
    });
    res.status(200).json({
      success: true,
      data: {
        products,
      },
    });
  } catch (err) {
    next(err);
  }
};

// filter products
const filterProducts = async (req, res) => {
  try {
    const { brand, model, year, price, color } = req.query;
    const filters = {};
    if (brand) filters.brand = brand;
    if (model) filters.model = model;
    if (year) filters.year = year;
    if (price) filters.price = price;
    if (color) filters.color = color;

    const products = await fetchByMultipleColumns(table, filters);
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }
    products.forEach((product) => {
      product.featured = product.featured === 1 ? true : false;
    });
    res.status(200).json({
      success: true,
      data: {
        products,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addProduct,
  fetchFeaturedProducts,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
  filterProducts,
};
