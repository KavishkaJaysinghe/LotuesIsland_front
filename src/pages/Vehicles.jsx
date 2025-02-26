import { useEffect, useState } from 'react';
import VehicleCard from '../components/VehicleComp/VehicleCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#F4AC20] p-2 rounded-full cursor-pointer shadow-md hover:bg-orange-600"
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </div>
  );
};

const VehicleSelectionPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(`/api/vehicles/getvehicles`);
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        setVehicles(data.vehicles || []); // Set to empty array if undefined
      } catch (error) {
        console.error('Error fetching vehicles', error);
      }
    };

    fetchVehicles();
  }, []);

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Default for desktop
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode: true,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Tablet
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1, // Mobile
        },
      },
    ],
  };

  return (
    <div className="space-y-0">
      {/* Static Section */}
      <div className="flex flex-col md:flex-row items-center py-16 p-4 border border-[#F4AC20] rounded-lg bg-white">
        <div className="flex-1 pr-4 md:ml-32">
          <h2 className="text-2xl md:text-4xl font-bold text-[#2b2b2b]">
            Explore the freedom of car rental with <span className="text-[#F4AC20]">Drivewise</span>
          </h2>
          <p className="my-4 text-sm md:text-lg text-gray-700">
            Whether you're planning a road trip, need a reliable vehicle for a business trip, or just want the convenience of having a car at your disposal, we've got you covered.
          </p>
        </div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/renuka-travels.appspot.com/o/pngwing.com.png?alt=media&token=52788d6e-1bac-49a6-b2c6-7c32e4d5609f"
          className="w-full md:w-[600px] lg:w-[800px] h-auto object-contain mt-6 md:mt-0"
        />
      </div>

      {/* Vehicle Cards with Slider */}
      <div className="max-w-6xl mx-auto p-3 py-7 relative z-10">
        {vehicles.length > 0 ? (
          <div className="flex flex-col gap-6">
            {/* Title */}
            <h2 className="text-2xl md:text-4xl font-bold text-left mx-4 md:mx-8">
              Select Your <span className="text-[#F4AC20]">Vehicle</span>
            </h2>
            <div className="relative">
              {/* Slider */}
              <Slider {...sliderSettings}>
                {vehicles.map((vehicle) => (
                  <div key={vehicle._id} onClick={() => handleSelectVehicle(vehicle)} className="p-4 md:p-9">
                    <VehicleCard vehicle={vehicle} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        ) : (
          <p className="text-center">No vehicles available.</p>
        )}
      </div>

      {/* Selected Vehicle Details */}
      {selectedVehicle && (
        <div className="flex flex-col md:flex-row items-center p-4 border border-[#F4AC20] rounded-lg">
          <div className="flex-1 p-4 md:p-32 pr-4">
  <h2 className="text-xl md:text-2xl font-bold">{selectedVehicle.title}</h2>
  <p className="my-4" dangerouslySetInnerHTML={{ __html: selectedVehicle.content }} />
  <button className="mt-4 bg-[#F4AC20] text-white px-4 py-2 rounded hover:bg-white hover:text-[#F4AC20] border border-[#F4AC20] transition-all">
    Select
  </button>
</div>

          <img
            src={selectedVehicle.image}
            alt={selectedVehicle.title}
            className="w-full md:w-[400px] lg:w-[500px] h-auto object-cover rounded-lg mt-4 md:mt-0"
          />
        </div>
      )}
    </div>
  );
};

export default VehicleSelectionPage;
