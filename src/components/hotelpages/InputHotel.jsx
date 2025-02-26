import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageUploader from "./ImageUploader"; // Adjust the path as needed
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function HotelForm({ onSave, initialValues = null }) {
  const [hotelName, setHotelName] = useState("");
  const [city, setCity] = useState("");
  const [rating, setRating] = useState(4);
  const [description, setDescription] = useState("");
  const [coverImageURL, setCoverImageURL] = useState(null);
  const [hotelImageURL, setHotelImageURL] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    // Check if initialValues is provided and contains an ID (to differentiate between add and update)
    if (initialValues && Object.keys(initialValues).length !== 0) {
      setHotelName(initialValues.name || "");
      setCity(initialValues.city || "");
      setRating(initialValues.rating || 4);
      setDescription(initialValues.description || "");
      setCoverImageURL(initialValues.coverImageURL || null);
      setHotelImageURL(initialValues.hotelImageURL || null);
      setIsUpdate(true);
    } else {
      resetForm();
    }
  }, [initialValues]);

  const resetForm = () => {
    setHotelName("");
    setCity("");
    setRating(4);
    setDescription("");
    setCoverImageURL(null);
    setHotelImageURL(null);
    setIsUpdate(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const hotelData = {
      name: hotelName,
      city: city,
      rating: rating,
      description: description,
      coverImageURL: coverImageURL,
      hotelImageURL: hotelImageURL,
    };

    try {
      let response;
      if (isUpdate) {
        // Update the existing hotel
        response = await axios.put(
          `/api/hotels/${initialValues._id}`,
          hotelData
        );
      } else {
        // Add a new hotel
        response = await axios.post("/api/hotels", hotelData);
      }
      console.log("Response:", response.data);
      onSave(); // Callback to handle actions after save (like closing the form or refreshing the list)
    } catch (error) {
      console.error(
        "Error saving hotel:",
        error.response ? error.response.data : error
      );
      alert("Failed to save hotel. Please check the data and try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-lg bg-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {isUpdate ? "Update Hotel Information" : "Hotel Registration"}
        </h3>
        <div className="my-4 ">
          <input
            type="text"
            id="hotelName"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Hotel Name"
            required
          />
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="City"
            required
          />
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Rating (1-5)"
            min="1"
            max="5"
            required
          />
          <div className="mt-2">
            <ImageUploader
              label="Cover Image"
              id="coverImage"
              imageURL={coverImageURL}
              setImageURL={setCoverImageURL}
            />
          </div>
          <div className="mt-2">
            <ImageUploader
              label="Hotel Image"
              id="hotelImage"
              imageURL={hotelImageURL}
              setImageURL={setHotelImageURL}
            />
          </div>
          {/* <textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Description"
            required
          ></textarea> */}
          <ReactQuill
            theme="snow"
            placeholder="Description"
            className="h-64 mt-2 mb-12"
            required
            value={description} // Make sure to bind the state to the editor
            onChange={setDescription} // Directly update the description state with the content
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#F4AC20] hover:bg-[#ffa53d]"
        >
          {isUpdate ? "Update Hotel" : "Publish Hotel"}
        </button>
      </form>
    </div>
  );
}
