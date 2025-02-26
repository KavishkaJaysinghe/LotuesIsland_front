import { useEffect, useState } from "react";

// Import slide images
import sec01 from "../images/sec01-01.jpg";
import sec02 from "../images/sec01-02.jpg";
import sec03 from "../images/sec01-03.jpg";
import sec04 from "../images/sec01-04.jpg";
import sec05 from "../images/sec01-05.jpg";

// Import food images
import food01 from "../images/service/food01.jpg";
import food02 from "../images/service/food02.jpg";

// Import hotel images
import hotel01 from "../images/service/hotel01.jpg";
import hotel02 from "../images/service/hotel02.jpg";
import hotel03 from "../images/service/hotel03.jpg";

// Import car images
import car01 from "../images/service/car01.jpeg";
import car02 from "../images/service/car02.jpeg";
import car03 from "../images/service/car03.jpeg";

// Import static images
import driver_img from "../images/service/Driver.png";
import car_img from "../images/service/Car.png";
import hotel_img from "../images/service/hotel.png";
import food_img from "../images/service/food.png";
import helicopter_img from "../images/service/helicopter.png";
import concierge_img from "../images/service/Concierge.png";
import driver_jpg from "../images/service/driver.jpg";
import helicopter_jpg from "../images/service/helicopter.jpg";
import contingence from "../images/service/contingence.jpg";

const images = {
  slides1: [sec01, sec02, sec03, sec04, sec05],
  slides2: [food01, food02],
  slides3: [hotel01, hotel02, hotel03],
  slides4: [car01, car02, car03],
  static: {
    driver: driver_img,
    car: car_img,
    hotel: hotel_img,
    food: food_img,
    helicopter: helicopter_img,
    concierge: concierge_img,
    driver_jpg,
    helicopter_jpg,
    contingence,
  },
};

const services = [
  {
    id: "food",
    title: "Food and beverages",
    icon: images.static.food,
    description:
      "Sri Lanka is a culinary paradise, offering a fusion of bold flavors and global cuisines. From spicy local curries and fresh seafood to Indian, Chinese, Italian, Western, and Thai delights, every meal is an experience. Our expert chefs and mixologists ensure a perfect blend of taste and tradition, making your journey even more memorable.",
    slideKey: "slides2",
  },
  {
    id: "hotels",
    title: "Hotels and Villas",
    icon: images.static.hotel,
    description:
      "Experience the finest luxury accommodations in Sri Lanka, offering breathtaking views of mountains and oceans. Our handpicked hotels and villas provide world-class service, ensuring comfort, elegance, and an unforgettable stay.",
    slideKey: "slides3",
  },
  {
    id: "vehicles",
    title: "Vehicle Rental",
    icon: images.static.car,
    description:
      "Travel in style with our fleet of luxury vehicles, available with or without chauffeurs. Choose your ideal ride and explore Sri Lanka at your own pace, ensuring comfort and convenience throughout your journey.",
    slideKey: "slides4",
  },
  {
    id: "chauffeur",
    title: "Chauffeur Drive Services",
    icon: images.static.driver,
    description:
      "Enjoy a seamless journey with our professional chauffeur drive services. Our experienced and friendly chauffeurs ensure a safe, comfortable, and stress-free travel experience, allowing you to relax and explore Sri Lanka with ease.",
    image: images.static.driver_jpg,
  },
  {
    id: "concierge",
    title: "Concierge Services",
    icon: images.static.concierge,
    description:
      "Our concierge services ensure a hassle-free and personalized travel experience. From itinerary planning and reservations to exclusive experiences, we take care of every detail, so you can relax and enjoy your journey in Sri Lanka.",
    image: images.static.contingence,
  },
  {
    id: "helicopter",
    title: "Personal Helicopters",
    icon: images.static.helicopter,
    description:
      "Option for personal helicopters to make your travel experience quicker and more enjoyable. Not only do they save valuable time, but they also offer stunning aerial views of Sri Lanka’s breathtaking landscapes, allowing you to see the country's beauty from a whole new perspective.",
    image: images.static.helicopter_jpg,
  },
];

const ServiceCard = ({ service, index, slideIndex }) => {
  const isEven = index % 2 === 0;

  const imageContent = service.slideKey ? (
    <div
      style={{
        backgroundImage: `url(${
          images[service.slideKey][slideIndex[service.slideKey]]
        })`,
      }}
      className={`w-full h-full bg-center bg-cover duration-1000 ${
        isEven
          ? "md:rounded-tr-2xl rounded-br-2xl"
          : "md:rounded-tl-2xl rounded-bl-2xl"
      }`}
    />
  ) : (
    <div
      style={{ backgroundImage: `url(${service.image})` }}
      className={`w-full h-full bg-center bg-cover duration-1000 ${
        isEven
          ? "md:rounded-tr-2xl rounded-br-2xl"
          : "md:rounded-tl-2xl rounded-bl-2xl"
      }`}
    />
  );

  const contentSection = (
    <div
      className={`w-full min-h-96  md:w-1/2 flex flex-col items-center text-center rounded-2xl md:rounded-none justify-center p-8 bg-yellow-300 duration-1000 ${
        isEven
          ? "md:rounded-tl-2xl md:rounded-bl-2xl"
          : "md:rounded-tr-2xl md:rounded-br-2xl"
      }`}
    >
      <img src={service.icon} alt={service.title} className="w-16" />
      <h2 className="text-3xl font-bold text-gray-700 hover:text-[2rem] duration-1000">
        {service.title}
      </h2>
      <blockquote className="border-l-4 border-yellow-300 italic text-xl hover:text-[1.26rem] duration-1000">
        {service.description}
      </blockquote>
    </div>
  );

  const imageSection = (
    <div className="w-full md:w-1/2 rounded-2xl flex items-center justify-center bg-white">
      {imageContent}
    </div>
  );

  return (
    <div
      id={service.id}
      className={`mt-8 flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } rounded-2xl shadow-xl hover:shadow-2xl duration-1000`}
    >
      {contentSection}
      {imageSection}
    </div>
  );
};

export default function OurServices() {
  const [slideIndex, setSlideIndex] = useState({
    slides1: 0,
    slides2: 0,
    slides3: 0,
    slides4: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => ({
        slides1: (prev.slides1 + 1) % images.slides1.length,
        slides2: (prev.slides2 + 1) % images.slides2.length,
        slides3: (prev.slides3 + 1) % images.slides3.length,
        slides4: (prev.slides4 + 1) % images.slides4.length,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToService = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <section>
      <div className="relative h-80 w-full">
        <div className="absolute inset-0">
          <div
            style={{
              backgroundImage: `url(${images.slides1[slideIndex.slides1]})`,
            }}
            className="w-full h-full bg-center bg-cover duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-5xl font-bold text-white mb-4">Our Services</h1>
            <div className="text-white text-lg flex flex-wrap justify-center gap-4 pt-1">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => scrollToService(service.id)}
                  className="flex items-center space-x-2 cursor-pointer hover:text-yellow-300 transition-colors"
                >
                  <span className="text-[#F4AC20]">•</span>
                  <span>{service.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="basic-struture">
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            slideIndex={slideIndex}
          />
        ))}
      </div>
    </section>
  );
}
