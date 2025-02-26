import React from "react";

export default function About() {
  return (
    <section className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Company Introduction */}
      <div className="flex flex-col md:flex-row my-4 rounded-2xl bg-white shadow-xl hover:shadow-2xl duration-1000">
        <div className="w-full md:w-1/2 flex items-center justify-center py-4 md:py-0">
          <img
            className="w-48 md:w-[20rem] drop-shadow-lg hover:w-52 md:hover:w-[22rem] duration-1000"
            src="https://firebasestorage.googleapis.com/v0/b/renuka-travels-and-tours.appspot.com/o/logo.png?alt=media&token=a7e8b83d-3459-463c-8a41-5439ec0b3f27"
            alt="Renuka Tours and Travels Logo"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 text-gray-700 text-lg leading-relaxed italic">
          <h1 className="text-3xl mt-4 md:mt-12 text-center">
            About Renuka Tours and Travels
          </h1>
          <div className="text-center m-4 md:m-6">
            At Renuka Tours and Travels, we're passionate about showcasing the
            beauty and culture of Sri Lanka to the world. With years of
            experience in the travel industry, we specialize in creating
            personalized travel experiences that cater to the unique preferences
            of our clients. From selecting top destinations and accommodations
            to organizing unforgettable activities, we take care of every detail
            so you can focus on enjoying your journey. Discover Sri Lanka's
            breathtaking landscapes, vibrant history, and warm hospitality with
            Renuka Tours and Travels, where every trip is crafted with care and
            expertise.
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="flex flex-col-reverse md:flex-row mt-8 mb-16 rounded-2xl shadow-xl hover:shadow-2xl duration-1000">
        <div className="w-full md:w-1/2 flex rounded-s-2xl items-center justify-center py-8 md:h-80 bg-white p-4 text-gray-700 text-lg leading-relaxed italic hover:text-[1.25rem] duration-1000">
          <blockquote className="border-l-4 border-yellow-300 pl-4 italic text-xl hover:text-[1.275rem] duration-1000">
            To be the most trusted and innovative travel partner, offering
            personalized and seamless travel experiences that showcase the
            beauty of Sri Lanka while ensuring comfort, affordability, and
            unforgettable memories for every traveler.
          </blockquote>
        </div>
        <div className="w-full md:w-1/2 flex rounded-tr-2xl rounded-br-2xl items-center justify-center py-8 md:h-80 bg-yellow-300 text-3xl font-bold text-gray-700 hover:text-[2rem] duration-1000">
          Our Vision
        </div>
      </div>

      {/* Mission Section */}
      <div className="flex flex-col md:flex-row my-8 rounded-2xl shadow-xl hover:shadow-2xl duration-1000">
        <div className="w-full md:w-1/2 flex items-center rounded-s-2xl justify-center py-8 md:h-80 bg-yellow-300 text-3xl font-bold text-gray-700 hover:text-[2rem] duration-1000">
          Our Mission
        </div>
        <div className="w-full md:w-1/2 flex rounded-tr-2xl rounded-br-2xl items-center justify-center py-8 md:h-80 bg-white p-4 text-gray-700 text-lg leading-relaxed italic hover:text-[1.25rem] duration-1000">
          <blockquote className="border-l-4 border-yellow-300 pl-4 italic text-xl hover:text-[1.275rem] duration-1000">
            "To provide personalized and hassle-free travel experiences by
            offering customized itineraries, comprehensive destination insights,
            seamless booking services, and efficient customer support, ensuring
            every journey is memorable and stress-free."
          </blockquote>
        </div>
      </div>
    </section>
  );
}
