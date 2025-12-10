import React, { useContext, useEffect } from "react";
import Navbar from "../shared/Navbar";
import PropertyCard from "./components/PropertyCard";
import FilterArea from "./components/FilterArea";
import { PropertyContext } from "@/context/PropertyContext";

const HomePage = () => {
  const { allProperty, fetchAllProperty } = useContext(PropertyContext);

  useEffect(() => {
    fetchAllProperty();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-5">

        <FilterArea onFilter={(filters) => console.log(filters)} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
          {allProperty?.map((item) => (
            <PropertyCard key={item._id} property={item} />
          ))}
        </div>

      </div>
    </>
  );
};

export default HomePage;