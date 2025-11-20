const express = require("express");
const { allProperties, getSingleProperty, searchProperties } = require("../controller/propertyListing.controller");
const router = express.Router();

router.get("/all-properties",allProperties);
router.get("/property/search",searchProperties);
router.get("/property/:id",getSingleProperty);

module.exports = router;