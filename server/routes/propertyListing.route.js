const express = require("express");
const { allProperties, getSingleProperty, searchProperties, coordinatesMapProperty } = require("../controller/propertyListing.controller");
const router = express.Router();

router.get("/all-properties",allProperties);
router.get("/property/search",searchProperties);
router.get("/property/:id",getSingleProperty);
router.get("/properties/map",coordinatesMapProperty);

module.exports = router;