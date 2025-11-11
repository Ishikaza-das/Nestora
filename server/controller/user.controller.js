const User = require("../models/user.model");
const Bcrypt = require('bcryptjs');
const getDataUri = require("../utils/datauri");
const cloudinary = require("../utils/cloudinary");

const register = async (req,res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message:"Somrthing is missing",
                success: false
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User already exist",
                success:false
            })
        }
        let profilePic;
        if(req.file){
            try {
                const fileUri = getDataUri(req.file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                profilePic = cloudResponse.secure_url;
            } catch (error) {
                console.error("File Upload error",error);
            }
        }
        const hashedPassword = await Bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashedPassword,
            profilePic
        });
        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false
        })
    }
};

module.exports = {register};