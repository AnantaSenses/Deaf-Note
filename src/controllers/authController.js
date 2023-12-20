// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt-node');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const { validateRegister, validateLogin } = require('../utils/validation');

const handleServerError = (res, error, message = 'Internal Server Error') => {
  console.error(`Error: ${error}`);
  res.status(500).json({ error: message });
};

const excludePassword = (user) => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const generateToken = (user) => {
  const payload = {
    userId: user.user_id,
    email: user.email,
  };

  const options = {
    expiresIn: process.env.JWT_EXPIRES_IN,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

const registerUser = async (req, res) => {
  try {
    const { error } = validateRegister(req.body);
    if (error) {
      const errorMessage = `Validation failed: ${error}`;
      return res.status(400).json({ error: errorMessage });
    }

    const existingUser = await userService.getUserByEmail(req.body.email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = await userService.createUser({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Generate a token for the newly registered user
    const token = generateToken(newUser);

    return res.json({
      message: 'Registration successful',
      user: excludePassword(newUser),
      token,
    });
  } catch (error) {
    return handleServerError(res, error, 'Error registering user');
  }
};

const loginUser = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      const errorMessage = `Validation failed: ${error}`;
      return res.status(400).json({ error: errorMessage });
    }

    const { email, password } = req.body;

    const user = await userService.getUserByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.setHeader('Authorization', `Bearer ${token}`);
      return res.status(200).json({
        message: 'Login successful',
        user: excludePassword(user),
        token,
      });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Add a default response in case none of the conditions are met
    return res.status(500).json({ error: 'Internal Server Error' });
  } catch (error) {
    return handleServerError(res, error, 'Error logging in');
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({
      message: `User found with ID ${userId}`,
      data: excludePassword(user),
    });
  } catch (error) {
    return handleServerError(res, error, 'Error getting user');
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const { name, email, password } = req.body;

    const { error } = validateRegister(req.body);
    if (error) {
      const errorMessage = `Validation failed: ${error}`;
      return res.status(400).json({ error: errorMessage });
    }

    const existingUserWithEmail = await userService.getUserByEmail(email);
    if (existingUserWithEmail && existingUserWithEmail.user_id !== userId) {
      return res.status(400).json({ error: 'Email is already registered by another user' });
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const updatedUser = await userService.updateUser(userId, {
      name,
      email,
      password: hashedPassword,
    });

    if (!updatedUser) {
      console.error('User not found or update failed');
      return res.status(404).json({ error: 'User not found or update failed' });
    }

    return res.status(200).json({
      message: 'User updated successfully',
      user: excludePassword(updatedUser),
    });
  } catch (error) {
    return handleServerError(res, error, 'Error updating user');
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const deletedUser = await userService.deleteUser(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found or already deleted' });
    }

    return res.json({ message: 'User deleted successfully', user: excludePassword(deletedUser) });
  } catch (error) {
    return handleServerError(res, error, 'Error deleting user');
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
};
