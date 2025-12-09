import React, { useContext, useEffect } from "react";
import Navbar from "../shared/Navbar";
import PropertyImageDispaly from "./components/PropertyImageDispaly";
import { useParams } from "react-router-dom";
import { PropertyContext } from "@/context/PropertyContext";
import PropertyDescription from "./components/PropertyDescription";
import MapComponent from "./components/MapComponent";

const PropertyView = () => {
  const params = useParams();
  const propertyId = params.id;
  const { fetchSingleProperty, singleProperty } = useContext(PropertyContext);

  useEffect(() => {
    fetchSingleProperty(propertyId);
  }, [propertyId]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 mt-4 space-y-8">
        <PropertyImageDispaly />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <PropertyDescription />
          </div>

          <div className="w-full h-[400px] bg-white shadow rounded-xl overflow-hidden">
  {singleProperty?.latitude && singleProperty?.longitude ? (
    <MapComponent
      lat={singleProperty.latitude}
      lng={singleProperty.longitude}
      title={singleProperty.title}
    />
  ) : (
    <div className="flex items-center justify-center h-full text-gray-500">
      Loading map...
    </div>
  )}
</div>
        </div>
      </div>
    </div>
  );
};

export default PropertyView;
