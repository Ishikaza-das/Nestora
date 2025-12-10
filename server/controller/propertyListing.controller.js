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

const searchProperties = async (req, res) => {
  try {
    const {
      location,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      keyword,
      sortBy,
      order,
    } = req.query;

    let filter = { status: "available" };

    if (keyword) {
      const bhkMatch = keyword.match(/(\d+)\s*bhk/i);
      const types = ["apartment", "villa", "house", "studio"];
      const foundType = types.find((t) => keyword.toLowerCase().includes(t));

      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
      ];

      if (bhkMatch) {
        filter.bedrooms = Number(bhkMatch[1]);
      }

      if (foundType) {
        filter.propertyType = new RegExp(foundType, "i");
      }
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
      if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
    }

    if (bedrooms) filter.bedrooms = Number(bedrooms);
    if (bathrooms) filter.bathrooms = Number(bathrooms);

    let sortOptions = {};
    if (sortBy) sortOptions[sortBy] = order === "desc" ? -1 : 1;

    const properties = await Property.find(filter).sort(sortOptions);

    res.status(200).json({
      message: `${properties.length} results found`,
      properties,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};



const coordinatesMapProperty = async (req,res) =>{
    try {
        const properties = await Property.find({},{title:1, latitude:1, longitude:1});
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

module.exports = {allProperties, getSingleProperty, searchProperties, coordinatesMapProperty};