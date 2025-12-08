import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { PropertyContext } from "@/context/PropertyContext";
import Autoplay from "embla-carousel-autoplay";
import React, { useContext } from "react";

const PropertyImageDispaly = () => {
  const {singleProperty} = useContext(PropertyContext);

  return (
    <div className="max-w-2xl md:max-w-5xl lg:max-w-7xl ml-auto mr-auto pl-5 pr-5">
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
          }),
        ]}
      >
       <CarouselContent className="w-full">
        {
          singleProperty?.images?.map((img,index) => (
            <CarouselItem key={index} className="w-full">
              <img src={img} className="w-full h-72 md:h-96 object-fill rounded-xl"/>
            </CarouselItem>
          ))
        }
       </CarouselContent>
      </Carousel>
    </div>
  );
};

export default PropertyImageDispaly;
