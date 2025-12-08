import { PropertyContext } from "@/context/PropertyContext";
import { BedIcon, ToiletIcon } from "lucide-react";
import React, { useContext } from "react";

const PropertyDescription = () => {
  const { singleProperty } = useContext(PropertyContext);
  return (
    <div className="bg-white shadow p-6 rounded-xl">
      <div className="space-y-3 text-gray-700">
        <p className="font-semibold text-xl">{singleProperty?.title}</p>
        <p>
          <span className="font-semibold">Location:</span>{" "}
          {singleProperty?.location}
        </p>
        <p>
          <span className="font-semibold">Price:</span> {singleProperty?.price}{" "}
          / month
        </p>
        <p>
          <span className="font-semibold">Type:</span>{" "}
          {singleProperty?.propertyType}
        </p>
        <p className="flex gap-3">
          <span className="font-semibold">
            <BedIcon />
          </span>{" "}
          {singleProperty?.bedrooms}
        </p>
        <p className="flex gap-3">
          <span className="font-semibold">
            <ToiletIcon />
          </span>{" "}
          {singleProperty?.bathrooms}
        </p>
        <p className="flex gap-2 flex-wrap">
          <span className="font-semibold">Amenities:</span>
          {singleProperty?.amenities?.map((item, index) => (
            <span key={index} className="text-gray-600">
              {item}
              {index !== singleProperty.amenities.length - 1 && ","}
            </span>
          ))}
        </p>

        <hr className="my-4" />

        <p className="text-gray-600 leading-relaxed">
          {singleProperty?.description}
        </p>
      </div>
    </div>
  );
};

export default PropertyDescription;
