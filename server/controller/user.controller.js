const User = require("../models/user.model");
const Bcrypt = require("bcryptjs");
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/datauri");
const Property = require("../models/property.model");
const Favorite = require("../models/favorite.model");

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    return res.status(200).json({
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

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        success: false,
      });
    }
    return res.status(200).json({
      message: "User Profile",
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

const updateProfile = async (req, res) => {
  try {
    const {name, email, phone} = req.body;
    const userId = req.id;
    const user = await User.findById(userId);
    if(!user){
        return res.status(400).json({
            message: "User not found",
            success: false
        })
    }
    const updateData = {}
    if(name) updateData.name = name
    if(email) updateData.email = email
    if(phone) updateData.phone = phone
    const updateUser = await User.findByIdAndUpdate(userId,{$set: updateData},{new: true});
    return res.status(200).json({
        message:"Update Successful",
        updateUser,
        success: true
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const changePassword = async (req,res) => {
    try {
        const {oldPassword, newPassword} = req.body;
        const userId = req.id;
         if(!oldPassword && !newPassword){
            return res.status(400).json({
                message: "Old password and new password are required.",
                success: false
            })
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message:"User not found",
                success: false
        })
        }
        const passwordMatch = await Bcrypt.compare(oldPassword,user.password);
        if(!passwordMatch){
            return res.status(400).json({
                message:"Old password did not match",
                success: false
            })
        }
        const hashedPassword = await Bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(userId,{password: hashedPassword},{new:true});
        return res.status(200).json({
            message:"Password Update.",
            user,
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

const chnageProfilePic = async (req,res) => {
    try {
        let updatedProfilePic;
        const userId = req.id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message:"User not found",
                success: false
            })
        }
        if(!req.file){
            return res.status(400).json({
                message:"No file selected",
                success: false
            })
        }
        const fileUri = getDataUri(req.file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        updatedProfilePic = cloudResponse.secure_url;
        await User.findByIdAndUpdate(userId,{profilePic: updatedProfilePic},{new:true});
        return res.status(200).json({
            message:"Profile pic updated",
            user,
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

const deleteAccount = async (req,res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if(!user){
      return res.status(400).json({
        message:"User not found",
        success: false
      })
    }
    await Property.deleteMany({landlordId: userId});
    await Favorite.deleteMany({userId});
    await User.findByIdAndDelete(userId);
    return res.status(200).json({
      message:"Account deleted",
      success: true
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false
    })
  }
}

module.exports = {getCurrentUser, getUserById, updateProfile, changePassword, chnageProfilePic, deleteAccount};