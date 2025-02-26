/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Select from "react-select";

export default function Waypoint({ days, destinations = [], onChange }) {
  const [allDestinations, setAllDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch("/api/destination/get-dest");
        const data = await res.json();
        if (res.ok) {
          setAllDestinations(data.destinations);
        } else {
          console.error("Failed to load destinations:", data.message);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };
    fetchDestinations();
  }, []);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      "@apply border-yellow-300 rounded-lg shadow-sm hover:border-yellow-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500":
        {},
    }),
    option: (provided, state) => ({
      ...provided,
      "@apply px-3 py-2": {},
      backgroundColor: state.isFocused ? "#FEF3C7" : "white",
    }),
    input: (provided) => ({
      ...provided,
      "@apply p-0.5": {},
    }),
    valueContainer: (provided) => ({
      ...provided,
      "@apply px-3 py-1.5": {},
    }),
    container: (provided) => ({
      ...provided,
      "@apply w-full": {},
    }),
  };

  return (
    <>
      {Array.from({ length: days }, (_, i) => (
        <div key={`waypoint-${i}`} className="mb-4">
          <label
            htmlFor={`waypoint-${i}`}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Day {i + 1}:
          </label>
          <Select
            id={`waypoint-${i}`}
            options={[
              { value: "", label: "None" },
              ...allDestinations.map((dest) => ({
                value: dest._id,
                label: dest.destinationName,
              })),
            ]}
            value={
              allDestinations
                .filter((dest) => dest._id === destinations[i])
                .map((dest) => ({
                  value: dest._id,
                  label: dest.destinationName,
                }))[0]
            }
            placeholder="Select a destination"
            isClearable
            className="w-full"
            classNamePrefix="select"
            styles={customStyles}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#3B82F6",
                primary25: "#FEF3C7",
                neutral20: "#FCD34D",
              },
            })}
            onChange={(selected) =>
              onChange(i + 1, selected ? selected.value : null)
            }
          />
        </div>
      ))}
    </>
  );
}
