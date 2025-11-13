const express = require("express");
const { getCurrentUser, getUserById, updateProfile, changePassword, chnageProfilePic, deleteAccount } = require("../controller/user.controller");
const { Upload } = require("../middleware/multer");
const isAuthenticated = require("../middleware/authenticated");

const router = express.Router();

router.get("/getMe",isAuthenticated,getCurrentUser);
router.get("/:id",getUserById);
router.put("/update-profile",isAuthenticated,updateProfile);
router.put("/update-pass",isAuthenticated,changePassword);
router.put("/update-profile-pic",isAuthenticated,Upload,chnageProfilePic);
router.delete("/delete",isAuthenticated,deleteAccount);

module.exports = router;