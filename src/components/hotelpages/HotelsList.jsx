import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#F4AC20] p-2 rounded-full cursor-pointer shadow-md hover:bg-orange-600"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#F4AC20] p-2 rounded-full cursor-pointer shadow-md hover:bg-orange-600"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </div>
  );
};

function HotelsList() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch(`/api/hotels`)
      .then((response) => response.json())
      .then((data) => setHotels(data))
      .catch((error) => console.error("Failed to fetch hotels:", error));
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-5 sm:p-6">
      <div className="mb-6">
        <span className="bg-[#F4AC20] text-white font-bold px-3 py-1 rounded">
          HOTELS
        </span>
      </div>
      {hotels.length > 0 ? (
        <Slider {...sliderSettings}>
          {hotels.map((hotel) => (
            <div key={hotel._id} className="p-4">
              <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
                <img
                  className="w-full h-48 object-cover"
                  src={hotel.hotelImageURL}
                  alt={hotel.name}
                />
                <div className="px-6 py-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="font-bold text-xl">{hotel.name}</div>
                    <span className="text-[#F4AC20] text-xl flex items-center">
                      ⭐ {hotel.rating}
                    </span>
                  </div>
                  <div className="flex justify-center">
                    <Link
                      to={`/hotels/${hotel._id}`}
                      className="bg-[#F4AC20] hover:bg-[#e2b04a] text-white font-bold py-2 rounded text-center block"
                      style={{ width: "128px" }}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center">No hotels available.</p>
      )}
    </div>
  );
}

export default HotelsList;
