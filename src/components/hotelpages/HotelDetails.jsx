import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3000/api/hotels/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setHotel(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 text-xl">Error: {error}</div>
    );

  return (
    <div className="container mx-auto p-4">
      {hotel && (
        <>
          {/* Cover Image */}
          <div className="w-full h-96 overflow-hidden relative">
            <img
              src={hotel.coverImageURL}
              alt={`Cover of ${hotel.name}`}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Hotel Details */}
          <div className="relative -mt-20 bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {hotel.hotelImageURL && (
                <div className="col-span-1 rounded-lg overflow-hidden h-64">
                  <img
                    src={hotel.hotelImageURL}
                    alt={`Image of ${hotel.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="col-span-2 space-y-4">
                <h1 className="text-4xl font-bold text-gray-800">
                  {hotel.name}
                </h1>
                <p className="text-lg text-gray-500">{hotel.city}</p>
                <p
                  className="text-md leading-relaxed text-gray-600"
                  dangerouslySetInnerHTML={{ __html: hotel.description }}
                ></p>
                <div className="text-lg font-semibold flex items-center">
                  <span className="mr-2">Rating:</span>
                  <span className="text-[#F4AC20] text-xl flex items-center">
                    ⭐ {hotel.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HotelDetails;
