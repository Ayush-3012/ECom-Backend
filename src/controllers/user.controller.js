import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { username, password, userType } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({
      username,
      password: await bcrypt.hash(password, 10),
      userType,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully as : ", userType });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({ message: "Login Successful " });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

export { registerUser, loginUser };
