const { Router } = require('express');
const router = Router();
const {
  login,
  register,
  getUserProfile,
  updateUserProfile,
  getUserProfileById,
  changePassword,
} = require('../controllers/user');
const { authorize, isAdmin } = require('../middleware/authorize');
const {
  addProduct,
  fetchProductById,
  fetchFeaturedProducts,
  fetchAllProducts,
  deleteProduct,
  searchProducts,
  updateProduct,
} = require('../controllers/product');
const { uploadImage } = require('../utils/image');

//user routes
router.post('/user/login', login);
router.post('/user/register', register);
router.get('/user/me', authorize, getUserProfile);
router.get('/user/:id', authorize, getUserProfileById);
router.put('/user', authorize, updateUserProfile);
router.put('/user/change-password', authorize, changePassword);

//product routes
router.post('/product', authorize, isAdmin, uploadImage, addProduct);
router.get('/product', authorize, fetchAllProducts);
router.put('/product/:id', authorize, isAdmin, uploadImage, updateProduct);
router.get('/product/:id', authorize, fetchProductById);
router.delete('/product/:id', authorize, isAdmin, deleteProduct);
router.get('/product/search', authorize, searchProducts);
router.get('/product/featured', authorize, fetchFeaturedProducts);

module.exports = router;
