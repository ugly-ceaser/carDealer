const {
  fetchAll,
  fetchById,
  fetchByColumn,
  create,
  update,
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
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addProduct,
};
