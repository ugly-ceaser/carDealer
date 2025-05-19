/**
 * Save image to folder
 * collect image from request
 * save image to folder
 * return image path
 */
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

//upload image middleware
const uploadImage = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Failed to upload image",
        error: err.message,
      });
    }
    req.imagePath = `${process.env.APP_URL}/uploads/${req.file.filename}`;
    next();
  });
};

module.exports = { uploadImage };
