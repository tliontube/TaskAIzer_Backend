import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// user Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body; // Get user data from request body

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User  not found" });

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Optionally, generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send response with user data and token
    res.json({
      user: { id: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register a new user
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body; // Get user data from request body
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser); // Send the saved user as response
  } catch (error) {
    res.status(400).json({ message: error.message }); // Send error message
  }
};

// Get a user by ID
export const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return { message: "User  not found" };
    return user;
  } catch (error) {
    console.log({ message: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: "User  not found" });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User  not found" });
    res.json({ message: "User  deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
