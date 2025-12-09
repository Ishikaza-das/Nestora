import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PropertyContext } from "@/context/PropertyContext";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const UpdateProperty = ({ open, setOpen }) => {
  const { singleProperty, setSingleProperty, refreshProperty} = useContext(PropertyContext);
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

  useEffect(() => {
    if (singleProperty) {
      setInput({
        title: singleProperty.title,
        description: singleProperty.description,
        price: singleProperty.price,
        location: singleProperty.location,
        bedrooms: singleProperty.bedrooms,
        bathrooms: singleProperty.bathrooms,
        amenities: Array.isArray(singleProperty.amenities)
          ? singleProperty.amenities.join(", ")
          : singleProperty.amenities,
        propertyType: singleProperty.propertyType,
      });
    }
  }, [singleProperty]);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handelUpdate = async (e) => {
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
      setLoading(true)
      const response = await axios.put(`${import.meta.env.VITE_PROPERTY_API}/update-property/${singleProperty?._id}`,formData,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials: true
      })
      if(response.data.success){
        setSingleProperty(response.data.property);
        await refreshProperty();
        setOpen(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally{
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col gap-4">
        <div>
          <h1 className="font-semibold text-xl mb-4">Update Property</h1>
          <form className="space-y-4" onSubmit={handelUpdate}>
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
                <Label htmlFor="price">Price (₹)/ month</Label>
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProperty;
