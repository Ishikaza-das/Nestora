import React, { useContext, useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import PropertyCard from "./components/PropertyCard";
import FilterArea from "./components/FilterArea";
import { PropertyContext } from "@/context/PropertyContext";
import axios from "axios";

const HomePage = () => {
  const { allProperty, fetchAllProperty } = useContext(PropertyContext);
  const [filteredProperties, setFilteredProperties] = useState(null);

  const fetchProperties = async (filters = {}) => {
    if (!filters || Object.keys(filters).length === 0) {
      setFilteredProperties(null);
      return;
    }

    try {
      const query = new URLSearchParams(filters).toString();
      const response = await axios.get(
        `${import.meta.env.VITE_PROPERTY_LISTING_API}/property/search?${query}`
      );

      if (response.data.success) {
        setFilteredProperties(response.data.properties);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProperty();
  }, []);

  const propertiesToDisplay =
    filteredProperties !== null ? filteredProperties : allProperty;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-5">
        <FilterArea onFilter={fetchProperties} />

        {propertiesToDisplay.length === 0 ? (
          <p className="text-center text-gray-500 mt-10 text-lg">
            No properties available
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
            {propertiesToDisplay.map((item) => (
              <PropertyCard key={item._id} property={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
