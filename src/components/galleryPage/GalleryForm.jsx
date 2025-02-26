import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageUploader from "./ImageUploader"; // Adjust the path as needed

export default function GalleryForm({ onSave, initialValues = null }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    // Check if initialValues is provided and contains an ID (to differentiate between add and update)
    if (initialValues && Object.keys(initialValues).length !== 0) {
      setName(initialValues.name || "");
      setCity(initialValues.city || "");
      setImageURL(initialValues.imageURL || null);
      setIsUpdate(true);
    } else {
      resetForm();
    }
  }, [initialValues]);

  const resetForm = () => {
    setName("");
    setCity("");
    setImageURL(null);
    setIsUpdate(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const galleryData = {
      name: name,
      city: city,
      imageURL: imageURL,
    };

    try {
      let response;
      if (isUpdate) {
        // Update the existing gallery item
        response = await axios.put(`/api/gallery/${initialValues._id}`, galleryData);
      } else {
        // Add a new gallery item
        response = await axios.post("/api/gallery", galleryData);
      }
      console.log("Response:", response.data);
      onSave(); // Callback to handle actions after save (like closing the form or refreshing the list)
    } catch (error) {
      console.error("Error saving gallery:", error.response ? error.response.data : error);
      alert("Failed to save gallery. Please check the data and try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-lg bg-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {isUpdate ? "Update Gallery Item" : "Gallery Registration"}
        </h3>
        <div className="my-4">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Image Name"
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
          <div className="mt-2">
            <ImageUploader
              label="Gallery Image"
              id="galleryImage"
              imageURL={imageURL}
              setImageURL={setImageURL}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#F4AC20] hover:bg-[#ffa53d]"
        >
          {isUpdate ? "Update Gallery" : "Add to Gallery"}
        </button>
      </form>
    </div>
  );
}
