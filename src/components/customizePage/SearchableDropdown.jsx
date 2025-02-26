import React, { useState, useEffect, useRef } from "react";

const SearchableDropdown = ({ destinations, handleSelectDestination }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredDestinations = destinations.filter((destination) =>
    destination.destinationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (destinationName) => {
    handleSelectDestination(destinationName);
    setSearchTerm(""); // Clear the search term
    setIsDropdownOpen(false); // Close the dropdown
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Search Input */}
      <input
        type="text"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
        placeholder="&#x1F50D; Search or select"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsDropdownOpen(true)}
      />

      {/* Dropdown Options */}
      {isDropdownOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((destination, index) => (
              <li
                key={index}
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelect(destination.destinationName)}
              >
                {destination.destinationName}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;
