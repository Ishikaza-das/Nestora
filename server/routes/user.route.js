const express = require("express");
const { register } = require("../controller/user.controller");
const { Upload } = require("../middleware/multer");

const router = express.Router();

router.post("/register",Upload,register);

module.exports = router;