const { getDb } = require('../db/connect');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

const collection = () => getDb().collection('users');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d' // Token expires in 7 days
  });
};

// Register new user
const register = async (req, res, next) => {
  try {
    const { username, email, password, role = 'user' } = req.body;

    // Check if user already exists
    const existingUser = await collection().findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'User already exists with this email or username'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = {
      username,
      email,
      password: hashedPassword,
      role: role || 'user', // Default to 'user' if no role specified
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert user into database
    const result = await collection().insertOne(user);
    const newUser = { ...user, _id: result.insertedId };

    // Generate token
    const token = generateToken(result.insertedId);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: 'Email or username already exists'
      });
    }
    next(error);
  }
};

// Login user
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await collection().findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get current user profile
const getProfile = async (req, res, next) => {
  try {
    const user = await collection().findOne({ _id: new ObjectId(req.user.userId) });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Omit sensitive data
    const { password, ...userData } = user;
    res.json(userData);
  } catch (error) {
    next(error);
  }
};

// Logout (client-side should remove token)
const logout = (req, res) => {
  // Client-side should remove the token
  res.json({ message: 'Logout successful' });
};

module.exports = {
  register,
  login,
  getProfile,
  logout
};
