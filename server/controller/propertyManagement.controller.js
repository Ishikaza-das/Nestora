const Property = require("../models/property.model");
const getDataUri = require("../utils/datauri");
const cloudinary = require("../utils/cloudinary");

const createProperty = async (req, res) => {
  try {
    const { title, description, price, location, latitude, longitude, bedrooms, bathrooms, amenities, propertyType } = req.body;
    const userId = req.id;
    if (!title ||!price ||!location ||!bedrooms ||!bathrooms ||!propertyType) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const splitAmities = Array.isArray(amenities)
      ? amenities
      : amenities.split(",").map((a) => a.trim());
    const property = await Property.create({
      title,
      description,
      price,
      location,
      latitude,
      longitude,
      bedrooms,
      bathrooms,
      amenities: splitAmities,
      propertyType,
      landlordId: userId,
    });
    return res.status(200).json({
      message: "Property added",
      property,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const uploadImages = async (req,res) => {
  try {
    const propertyId = req.params.id;

    const property = await Property.findById(propertyId);
    if(!property){
      return res.status(404).json({
        message: "Property not found",
        success: false
      })
    }

    if(!req.files || req.files.length === 0){
      return res.status(400).json({
        message: "No images uploaded",
        success: false
      })
    }

    const UI = await uploadPropertyImages(req.files);

    property.images.push(...UI);
    await property.save();

    return res.status(200).json({
      message:"Images uploaded successfully",
      images: property.images,
      success: true
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false
    })
  }
}

const uploadPropertyImages = async (files) => {
  let uploadedImages = [];
  if (!files || files.length === 0) return uploadedImages;

  for (let file of files) {
    const fileuri = getDataUri(file);

    const result = await cloudinary.uploader.upload(fileuri.content, {
      folder: "property_images",
    });

    uploadedImages.push(result.secure_url);
  }

  return uploadedImages;
};

const updatePropertyDetails = async (req,res) => {
  try {
    const { title, description, price, location, latitude, longitude, bedrooms, bathrooms, amenities, propertyType } = req.body;
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId);
    if(!property){
      return res.status(400).json({
        message:"Property not found",
        success: false
      })
    }
    const updateData = {}
    if(title) updateData.title = title
    if(description) updateData.description = description
    if(price) updateData.price = price
    if(location) updateData.location = location
    if(latitude) updateData.latitude = latitude
    if(longitude) updateData.longitude = longitude
    if(bedrooms) updateData.bedrooms = bedrooms
    if(bathrooms) updateData.bathrooms = bathrooms
    if(amenities) updateData.amenities = amenities
    if(propertyType) updateData.propertyType = propertyType

    const updatedProperty = await Property.findByIdAndUpdate(propertyId, {$set: updateData}, {new: true});

    return res.status(200).json({
      message:"Update Successfully",
      success: true,
      property: updatedProperty
    })
    
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false
    })
  }
}

const updatePropertyStatus = async (req,res) => {
  try {
  const propertyId = req.params.id;
  const { status } = req.body;
  const property = await Property.findById(propertyId);
  if(!property){
    return res.status(400).json({
      message:"No property found",
      success: false
    })
  }
  const updateStatus = await Property.findByIdAndUpdate(propertyId, {$set: {status}},{new:true});
  return res.status(200).json({
    message: "Status updated successfully",
    success: true,
    property: updateStatus
  })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false
    })
  }
}

const deleteProperty = async (req,res) => {
  try {
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId);
  if(!property){
    return res.status(400).json({
      message:"No property found",
      success: false
    })
  }
  await Property.findByIdAndDelete(propertyId);
  return res.status(200).json({
    message: "Property deleted",
    success: true
  })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false
    })
  }
}

const userListedProperty = async (req,res) => {
  try {
    const userId = req.id;
    const properties = await Property.find({landlordId:userId});
    if(!properties){
      return res.status(400).json({
        message: "No properties created by user.",
        success: false
      })
    }
    return res.status(200).json({
      message:`${properties.length} properties found`,
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

module.exports = { createProperty, uploadImages, updatePropertyDetails, updatePropertyStatus, deleteProperty, userListedProperty};
