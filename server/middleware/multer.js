const multer = require("multer");

const storage = multer.memoryStorage();

const Upload = multer({storage}).single("file");

const multiUpload = multer({storage}).array("files",10);

module.exports = {Upload, multiUpload};