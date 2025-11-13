const express = require("express");
const { register, login, logOut, forgetPassword, resetPassword } = require("../controller/auth.controller");
const { Upload } = require("../middleware/multer");
const isAuthenticated = require("../middleware/authenticated");

const router = express.Router();

router.post("/register",Upload,register);
router.post("/login",login);
router.get("/logout",isAuthenticated,logOut);
router.post("/forgot-password",forgetPassword);
router.post("/reset-password/:token",resetPassword);

module.exports = router;