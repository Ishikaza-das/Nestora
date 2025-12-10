import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Bed, Bath, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <Card className="rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
      onClick={() => navigate(`/propertyview/${property._id}`)}
    >

      <div className="h-48 w-full overflow-hidden">
        <img
          src={property?.images?.[0] || "/placeholder.jpg"}
          alt={property.title}
          className="h-full w-full object-cover transform hover:scale-105 transition duration-300"
        />
      </div>

      <CardContent className="p-4 space-y-2">
        <h2 className="font-semibold text-lg line-clamp-1">
          {property.title}
        </h2>
        <p className="text-sm flex items-center gap-1 text-gray-600">
          <Home className="h-4 w-4" /> {property.propertyType}
        </p>
        <p className="text-sm flex items-center gap-1 text-gray-600">
          <MapPin className="h-4 w-4" /> {property.location}
        </p>
        <p className="font-semibold text-yellow-600 text-lg">
          ₹{property.price.toLocaleString()}
        </p>
        <div className="flex gap-4 text-sm text-gray-600 mt-2">
          <span className="flex items-center gap-1">
            <Bed className="h-4 w-4" /> {property.bedrooms} Beds
          </span>
          <span className="flex items-center gap-1">
            <Bath className="h-4 w-4" /> {property.bathrooms} Bath
          </span>
        </div>

        <Button
          variant="outline"
          className="w-full mt-3"
        >
          View Details
        </Button>

      </CardContent>
    </Card>
  );
};

export default PropertyCard;
