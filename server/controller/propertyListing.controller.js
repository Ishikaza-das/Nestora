const Property = require("../models/property.model");

const allProperties = async (req,res) => {
    try {
        const properties = await Property.find();
        return res.status(200).json({
            properties,
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

const getSingleProperty = async (req,res) => {
    try {
        const propertyId = req.params.id;
        const property = await Property.findById(propertyId);
        if(!property){
            return res.status(400).json({
                message:"Property not found",
                success: false
            })
        }
        return res.status(200).json({
            property,
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

const searchProperties = async (req,res) => {
    try {
        const {location, minPrice, maxPrice, bedrooms, bathrooms, propertyType, amenities, sortBy, order } = req.query;
        let filter = {};

        if(location){
            filter.location = {$regex: location, $options: "i"}
        }
        if(minPrice || maxPrice){
            filter.price = {};
            if(minPrice) filter.price.$gte = Number(minPrice);
            if(maxPrice) filter.price.$lte = Number(maxPrice);
        }
        if(bedrooms){
            filter.bedrooms = Number(bedrooms);
        }
        if(bathrooms){
            filter.bathrooms = Number(bathrooms);
        }
        if(propertyType){
            filter.propertyType = propertyType;
        }
        if(amenities){
            filter.amenities = {$all: amenities.split(",")};
        }
        filter.status = "available";

        let sortOptions = {};
        if(sortBy){
            sortOptions[sortBy] = order === "desc" ? -1:1;
        }

        const properties = await Property.find(filter).sort(sortOptions);

        res.status(200).json({
            message:`${properties.length} results found`,
            properties,
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

module.exports = {allProperties, getSingleProperty, searchProperties};