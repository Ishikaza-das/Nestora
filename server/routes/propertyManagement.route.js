const express = require("express");
const isAuthenticated = require("../middleware/authenticated");
const { createProperty, uploadImages, updatePropertyDetails, updatePropertyStatus, deleteProperty, userListedProperty } = require("../controller/propertyManagement.controller");
const {multiUpload} = require("../middleware/multer");

const router = express.Router();

router.post("/add-property",isAuthenticated,multiUpload,createProperty);
router.post("/:id/images",isAuthenticated, multiUpload, uploadImages);
router.put("/update-property/:id",isAuthenticated,updatePropertyDetails);
router.put("/status/:id",isAuthenticated,updatePropertyStatus);
router.delete("/delete/:id",isAuthenticated,deleteProperty);
router.get("/user",isAuthenticated,userListedProperty);

module.exports = router;