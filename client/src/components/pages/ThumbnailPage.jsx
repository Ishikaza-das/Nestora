import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ThumbnailPage() {
  return (
    <>
    <Navbar/>
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
          <CarouselItem className="w-full">
            <img
              src="/carosal1.jpg"
              alt="Apartment 1"
              className="w-full h-72 md:h-96 object-fill rounded-xl"
            />
          </CarouselItem>
          <CarouselItem className="w-full">
            <img
              src="/carosal2.jpg"
              alt="Apartment 2"
              className="w-full h-72 md:h-96 object-fill rounded-2xl"
            />
          </CarouselItem>
          <CarouselItem className="w-full">
            <img
              src="/carosal3.webp"
              alt="Apartment 3"
              className="w-full h-72 md:h-96 object-fill rounded-2xl"
            />
          </CarouselItem>
          <CarouselItem className="w-full">
            <img
              src="/carosal4.jpg"
              alt="Apartment 4"
              className="w-full h-72 md:h-96 object-fill rounded-2xl"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <div className="flex justify-between pt-8">
        <div className="md:w-1/2">
          <h1 className="font-bold text-4xl md:text-6xl">Find Your Next Home with Ease</h1>
          <p className="text-wrap text-lg">Discover apartments, houses, and rentals that match your lifestyle — all in one place.</p>
        </div>
        <div className="hidden md:flex md:w-1/2">
          <img src="/thumbnail.jpg" className="w-full h-60 object-fill"/>
        </div>
      </div>
      <div className="flex mt-6 justify-center">
        <Input type="text" className="md:w-96 rounded-tr-none rounded-br-none" placeholder="Search Your Place"/>
        <Button className="bg-yellow-400 rounded-tl-none rounded-bl-none hover:bg-yellow-500"><Search/></Button>
      </div>
    </div>
      <Footer/>
    </>
  );
}
