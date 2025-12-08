import React, { useContext, useState } from "react";
import Navbar from "../shared/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { PropertyContext } from "@/context/PropertyContext";

const AddProperty = () => {
  const {refreshProperty} = useContext(PropertyContext)
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    amenities: "",
    propertyType: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handelAddProperty = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("price", input.price);
    formData.append("location", input.location);
    formData.append("bedrooms", input.bedrooms);
    formData.append("bathrooms", input.bathrooms);
    formData.append("amenities", input.amenities);
    formData.append("propertyType", input.propertyType);

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_PROPERTY_API}/add-property`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await refreshProperty();
        const propertyId = response.data.property._id;
        navigate(`/${propertyId}/images`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex justify-center">
          <Card className="w-full max-w-lg shadow-xl rounded-2xl p-4">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="font-bold text-3xl text-yellow-500">
                Add Property
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm">
                Fill in the details below to list your property.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <form className="space-y-4" onSubmit={handelAddProperty}>
                <div className="space-y-1">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="2BHK Apartment in Mumbai"
                    value={input.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    type="text"
                    placeholder="Describe your property"
                    value={input.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="15000"
                      value={input.price}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      type="text"
                      placeholder="Bandra West, Mumbai"
                      value={input.location}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      placeholder="3"
                      value={input.bedrooms}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      placeholder="2"
                      value={input.bathrooms}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="amenities">Amenities</Label>
                  <Input
                    id="amenities"
                    type="text"
                    placeholder="Parking, Lift, Security"
                    value={input.amenities}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Input
                    id="propertyType"
                    type="text"
                    placeholder="Apartment / House / Villa"
                    value={input.propertyType}
                    onChange={handleInputChange}
                  />
                </div>

                {loading ? (
                  <Button
                    className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl"
                    type="submit"
                  >
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Adding...
                  </Button>
                ) : (
                  <Button
                    className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl"
                    type="submit"
                  >
                    Add Property
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
