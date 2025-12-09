import { Button } from "@/components/ui/button";
import { PropertyContext } from "@/context/PropertyContext";
import { UserContext } from "@/context/UserContext";
import { BedIcon, Pen, ToiletIcon } from "lucide-react";
import React, { useContext, useState } from "react";
import UpdateProperty from "./UpdateProperty";

const PropertyDescription = () => {
  const { singleProperty } = useContext(PropertyContext);
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white shadow p-6 rounded-xl flex justify-between">
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
        <div className="flex justify-between">
          <p className="text-gray-600 leading-relaxed">
          {singleProperty?.description}
        </p>
        <Button className="bg-yellow-400 hover:bg-yellow-500 cursor-pointer">Chat with Owner</Button>
        </div>
      </div>
      {
        user?._id === singleProperty?.landlordId && (
            <Button className="bg-yellow-400 hover:bg-yellow-500 cursor-pointer" onClick={() => setIsOpen(true)}><Pen/></Button>
        )
      }
      <UpdateProperty open={isOpen} setOpen={setIsOpen}/>
    </div>
  );
};

export default PropertyDescription;
