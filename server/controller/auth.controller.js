const User = require("../models/user.model");
const Bcrypt = require("bcryptjs");
const getDataUri = require("../utils/datauri");
const cloudinary = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");
const randomString = require("randomstring");
const transporter = require("../utils/emailTransporter");

const register = async (req, res) => {
  try {
    const { name, email, password, phone} = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        message: "Somrthing is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist",
        success: false,
      });
    }
    let profilePic;
    if (req.file) {
      try {
        const fileUri = getDataUri(req.file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        profilePic = cloudResponse.secure_url;
      } catch (error) {
        console.error("File Upload error", error);
      }
    }
    const hashedPassword = await Bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
      profilePic,
      phone,
    });
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    const isPassword = await Bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({
        message: "Incorrect Password",
        success: false,
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
    };
    return res.status(200).json({
      message: `Welcome back ${user.name}`,
      user,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const logOut = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email not found",
        success: false,
      });
    }
    const rString = randomString.generate();
    await User.updateOne({ email }, { $set: { token: rString } });
    await sendResetPasswordEmail(user.name, user.email, rString);
    return res.status(200).json({
      message: "Please check your email",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const sendResetPasswordEmail = async (name, email, token) => {
  const resetLink = `http://localhost:5000/reset-password/${token}`;
  transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    html: `
      <h2>Hello ${name || "User"}</h2>
        <p>You requeste a password reset on Nestora.</p>
        <p>Click below to reset your password:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>If you didn’t request this, ignore this email.</p>
      `,
  });
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password is missing",
        success: false,
      });
    }
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
        success: false,
      });
    }
    const hashedPassword = await Bcrypt.hash(password, 10);
    await User.updateOne(
      { token },
      { $set: { password: hashedPassword, token: null } }
    );

    return res.status(200).json({
      message: "Password has been reset successfully.",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { register, login, logOut, forgetPassword, resetPassword };
