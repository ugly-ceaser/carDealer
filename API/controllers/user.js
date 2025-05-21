const { fetchByColumn, create, update } = require('../utils/helpers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const table = 'users';

// Login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Email and password are required' });
    }

    if (!email.includes('@')) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email format' });
    }

    const results = await fetchByColumn(table, 'email', email);
    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email' });
    }

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, name: user.name, email },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Register
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required',
      });
    }

    if (!email.includes('@')) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email format' });
    }

    const existingUsers = await fetchByColumn(table, 'email', email);
    if (existingUsers.length > 0) {
      return res
        .status(409)
        .json({ success: false, message: 'Email already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    await create(table, { name, email, password: hashedPassword });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
    });
  } catch (err) {
    next(err);
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  const user = res.locals.user;
  res.status(200).json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
};

// Get User Profile by ID
const getUserProfileById = async (req, res, next) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    const results = await fetchByColumn(table, 'id', userId);
    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    const user = results[0];
    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Update User Profile
const updateUserProfile = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const { name, email } = req.body;

    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, message: 'Name and email are required' });
    }

    if (!email.includes('@')) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email format' });
    }

    await update(table, userId, { name, email });

    const updatedUser = await fetchByColumn(table, 'id', userId);
    if (updatedUser.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      data: {
        user: {
          id: updatedUser[0].id,
          name: updatedUser[0].name,
          email: updatedUser[0].email,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

// Change Password
const changePassword = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Old password and new password are required',
      });
    }

    const results = await fetchByColumn(table, 'id', userId);
    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    const user = results[0];
    const isOldPasswordValid = bcrypt.compareSync(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: 'Incorrect old password' });
    }

    const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
    await update(table, userId, { password: hashedNewPassword });

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  register,
  getUserProfile,
  getUserProfileById,
  updateUserProfile,
  changePassword,
};
