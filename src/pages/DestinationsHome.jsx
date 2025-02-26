import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import welcomeImg from "../images/Welcome.jpg";

export default function DestinationHone() {
  const { destSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [destination, setDestination] = useState(null);
  const [destinationNames, setDestinationNames] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [hotelLoading, setHotelLoading] = useState(true);
  const [hotelError, setHotelError] = useState(false);
  const navigate = useNavigate();

  const ImageSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const prevSlide = () => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
      setCurrentIndex(slideIndex);
    };

    const toggleFullScreen = () => {
      setIsFullScreen(!isFullScreen);
    };

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }, [slides.length]);

    return (
      <>
        <div className="md:pt-4 invisible md:visible lg:visible">
          <div className="relative md:h-[360px] rounded-md md:flex md:justify-center h-1/5 m-6 md:m-0 group">
            {/* Navigation Buttons (inside image container) */}
            <div className="hidden group-hover:block absolute top-1/2 left-5 -translate-y-1/2 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            <div className="hidden group-hover:block absolute top-1/2 right-5 -translate-y-1/2 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
            {/* Image Container */}
            <div
              style={{ backgroundImage: `url(${slides[currentIndex]})` }}
              className="w-full h-full rounded-2xl bg-center bg-cover duration-1000 cursor-pointer"
              onClick={toggleFullScreen}
            ></div>
          </div>
          <div className="flex justify-center">
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className="text-2xl mx-2 cursor-pointer"
              >
                •
              </div>
            ))}
          </div>
        </div>

        {isFullScreen && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
            <div className="relative w-full h-full flex justify-center items-center">
              <img
                src={slides[currentIndex]}
                alt={`Slide ${currentIndex}`}
                className="max-w-full max-h-full"
              />
              <div
                className="absolute top-5 right-5 text-white text-3xl cursor-pointer"
                onClick={toggleFullScreen}
              >
                <AiOutlineClose />
              </div>
              <div
                className="absolute top-1/2 left-5 -translate-y-1/2 text-3xl text-white cursor-pointer"
                onClick={prevSlide}
              >
                <BsChevronCompactLeft />
              </div>
              <div
                className="absolute top-1/2 right-5 -translate-y-1/2 text-3xl text-white cursor-pointer"
                onClick={nextSlide}
              >
                <BsChevronCompactRight />
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/destination/get-dest/?slug=${destSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        setDestination(data.destinations[0]);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchDestinations();
  }, [destSlug]);

  useEffect(() => {
    const fetchDestinationNames = async () => {
      try {
        const res = await fetch(`/api/destination/get-dest`);
        const data = await res.json();
        if (res.ok) {
          const names = data.destinations.map((destination) => ({
            name: destination.destinationName,
            slug: destination.slug,
          }));
          setDestinationNames(names);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDestinationNames();
  }, []);

  useEffect(() => {
    if (destination?.destinationName) {
      const fetchHotels = async () => {
        try {
          setHotelLoading(true);
          const res = await fetch(
            `/api/hotels/hotels?city=${destination.destinationName}`
          );
          const data = await res.json();
          if (!res.ok) {
            setHotelError(true);
            setHotelLoading(false);
            return;
          }
          setHotels(data);
          setHotelLoading(false);
        } catch (error) {
          setHotelError(true);
          setHotelLoading(false);
        }
      };
      fetchHotels();
    }
  }, [destination]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full">
        <div className="absolute inset-0">
          <img
            src={welcomeImg}
            alt="Welcome"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b " />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Description Section */}
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Welcome to Sri Lanka
              </h2>
              <div
                className="prose prose-lg max-w-none text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: `<p>	Sri Lanka, an island nation in the Indian Ocean, is a <strong>paradise for travelers</strong> seeking diverse experiences. Known for its stunning landscapes, the country offers a rich tapestry of <strong>cultural heritage and natural beauty</strong>.</p><p><br></p><p>	One of the highlights is the <strong>Ancient City of Sigiriya</strong>, a UNESCO World Heritage site featuring a magnificent rock fortress that dates back to the 5th century. The city of <strong>Kandy</strong>, home to the <strong>Temple of the Sacred Tooth Relic</strong>, is another cultural gem, where visitors can immerse themselves in Buddhist traditions.</p><p><br></p><p>	For nature lovers, the <strong>Yala National Park</strong> presents a chance to spot majestic wildlife, including leopards and elephants, amidst lush scenery. <strong>Unawatuna Beach</strong> and <strong>Mirissa</strong> are perfect for sun-seekers, offering pristine sands and vibrant marine life for snorkeling enthusiasts.</p><p><br></p><p>	With its <strong>breathtaking landscapes, rich history, and warm hospitality</strong>, Sri Lanka is a captivating destination that promises unforgettable adventures.</p>`,
                }}
              ></div>
            </div>

            {/* Other Destinations Section */}
            <div className="lg:w-1/3">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Explore All the Destinations
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  {destinationNames
                    .sort((a, b) => a.name.localeCompare(b.name)) // Sorting alphabetically
                    .map((dest, index) => (
                      <button
                        key={index}
                        onClick={() => navigate(`/destinations/${dest.slug}`)}
                        className="w-full p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-gray-900 text-left group flex items-center justify-between"
                      >
                        <span className="font-medium">{dest.name}</span>
                        <svg
                          className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Image Slider */}
          {destination?.additionalImages?.length > 0 && (
            <ImageSlider slides={destination.additionalImages} />
          )}
        </div>
      </div>
    </div>
  );
}
