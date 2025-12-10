import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function ThumbnailPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-5">

        <Carousel
          className="w-full relative"
          plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
        >
          <CarouselContent className="w-full">
            {["carosal1.jpg", "carosal2.jpg", "carosal3.webp", "carosal4.jpg"].map((src, index) => (
              <CarouselItem key={index} className="w-full relative">
                <img
                  src={`/${src}`}
                  alt={`Apartment ${index + 1}`}
                  className="w-full h-72 md:h-96 object-cover rounded-xl"
                />
                {/* Overlay Text */}
                <div className="absolute top-10 left-5 md:left-10 bg-black bg-opacity-40 p-4 rounded">
                  <h2 className="text-white text-xl md:text-3xl font-bold">
                    Find Your Dream Home
                  </h2>
                  <p className="text-gray-200 text-sm md:text-base mt-1">
                    Explore the best properties in your city.
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-4">
          <div className="md:flex-1">
            <h1 className="font-bold text-4xl md:text-6xl mb-4">
              Find Your Next Home with Ease
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              Discover apartments, houses, and rentals that match your lifestyle — all in one place.
            </p>

            <div className="flex gap-3 mt-6 flex-wrap">
              {["Apartment", "Villa", "Studio", "House"].map((cat) => (
                <Button key={cat} variant="outline" className="px-4 py-2 rounded-lg">
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex md:w-1/2">
            <img src="/thumbnail.jpg" className="w-full h-60 object-cover rounded-xl" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 text-center">
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-3xl font-bold text-yellow-500">1000+</h3>
            <p className="text-gray-600">Properties Available</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-3xl font-bold text-yellow-500">500+</h3>
            <p className="text-gray-600">Cities Covered</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-3xl font-bold text-yellow-500">200+</h3>
            <p className="text-gray-600">Premium Listings</p>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}
