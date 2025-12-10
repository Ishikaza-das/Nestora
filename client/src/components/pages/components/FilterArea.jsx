import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterArea = ({ onFilter }) => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([5000, 50000]);
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");

  const applyFilters = () => {
    const filters = {};

    if (keyword.trim()) filters.keyword = keyword.trim();
    if (location.trim()) filters.location = location.trim();
    if (priceRange[0] !== 5000) filters.minPrice = Number(priceRange[0]);
    if (priceRange[1] !== 50000) filters.maxPrice = Number(priceRange[1]);
    if (bedrooms) filters.bedrooms = Number(bedrooms);
    if (bathrooms) filters.bathrooms = Number(bathrooms);

    onFilter(filters);
  };

  const resetFilters = () => {
    setKeyword("");
    setLocation("");
    setPriceRange([5000, 50000]);
    setBedrooms("");
    setBathrooms("");

    onFilter({});
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border">
      <h2 className="text-xl font-semibold mb-4">Filter Properties</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-1">
          <Label>Keyword</Label>
          <Input
            placeholder="2BHK, Villa, Luxury..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label>Location</Label>
          <Input
            placeholder="Mumbai, Delhi..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="col-span-full space-y-1">
          <Label>Price Range (₹)</Label>
          <Slider
            value={priceRange}
            min={5000}
            max={100000}
            step={1000}
            onValueChange={setPriceRange}
          />
          <div className="flex justify-between text-sm mt-1">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>

        <div className="space-y-1">
          <Label>Bedrooms</Label>
          <Select value={bedrooms} onValueChange={setBedrooms}>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>Bathrooms</Label>
          <Select value={bathrooms} onValueChange={setBathrooms}>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={resetFilters}>
          Reset
        </Button>

        <Button
          onClick={applyFilters}
          className="bg-yellow-500 hover:bg-yellow-600"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterArea;
