const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user"); // Replace with your user model import

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const SignUp = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(201).json({
      msg: "User created successfully",
      token: generateToken(newUser._id),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "An error occurred" });
  }
};

const SignIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: "Authentication failed" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Authentication failed" });
    }

    const token = generateToken(user._id); // Assuming your user model has an _id field

    return res.status(200).json({ msg: "Authentication successful", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "An error occurred" });
  }
};
module.exports = {
  SignIn,
  SignUp,
};
