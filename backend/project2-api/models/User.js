const { getDb } = require('../db/connect');
const bcrypt = require('bcrypt');

const collection = () => getDb().collection('users');

// Register new user
const register = async (userData) => {
  const { username, email, password, role = 'user' } = userData;
  
  // Check if user already exists
  const existingUser = await collection().findOne({
    $or: [{ email }, { username }]
  });

  if (existingUser) {
    throw new Error('User already exists with this email or username');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = {
    username,
    email,
    password: hashedPassword,
    role,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const result = await collection().insertOne(user);
  return { ...user, _id: result.insertedId };
};

// Login user
const login = async (email, password) => {
  const user = await collection().findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return user;
};

// Get user by ID
const findById = async (id) => {
  return await collection().findOne({ _id: id });
};

// Get user by email
const findByEmail = async (email) => {
  return await collection().findOne({ email });
};

module.exports = {
  register,
  login,
  findById,
  findByEmail
};