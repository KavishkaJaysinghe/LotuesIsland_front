// "use client";
// import SearchBar from "../shared/dest-dropdown";
// import { useEffect, useState } from "react";
// import {
//   APIProvider,
//   Map,
//   useMapsLibrary,
//   useMap,
// } from "@vis.gl/react-google-maps";
// import { HiArrowNarrowRight } from "react-icons/hi";
// import { Datepicker, TextInput, Timeline, Button } from "flowbite-react";
// import VehicleSection from "./VehicleSection";

// export default function MapComp() {
//   const [formData, setFormData] = useState({});
//   const [zoom, setZoom] = useState(7.9);
//   const position = { lat: 7.87, lng: 80.77 };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // try {
//     //     const res = await fetch(`/api/destination/update-dest/${formData._id}`, {
//     //     method: "PUT",
//     //     headers: {
//     //       "Content-Type": "application/json",
//     //     },
//     //     body: JSON.stringify(formData),
//     //   });
//     //   const data = await res.json();
//     //   if (!res.ok) {
//     //     setPublishError(data.message);
//     //     return;
//     //   }

//     //   if (res.ok) {
//     //     setPublishError(null);
//     //     navigate(`/destinations/${data.slug}`);
//     //   }
//     // } catch (error) {
//     //   setPublishError("Something went wrong");
//     // }
//   };

//   // Map zoom level controller
//   useEffect(() => {
//     const updateZoom = () => {
//       const screenHeight = window.innerHeight;
//       let calculatedZoom;

//       if (screenHeight < 600) {
//         calculatedZoom = 6.5; // Set zoom for smaller screens
//       } else if (screenHeight < 800) {
//         calculatedZoom = 7.5;
//       } else {
//         calculatedZoom = 7.9; // Set zoom for larger screens
//       }

//       setZoom(calculatedZoom);
//     };

//     updateZoom();
//     window.addEventListener("resize", updateZoom);

//     return () => window.removeEventListener("resize", updateZoom);
//   }, []);

//   // Map Height level controller
//   const [mapHeight, setMapHeight] = useState("80vh"); // Default height

//   useEffect(() => {
//     const updateHeight = () => {
//       const screenHeight = window.innerHeight;

//       if (screenHeight < 600) {
//         setMapHeight("50vh"); // Smaller height for small screens
//       } else if (screenHeight < 800) {
//         setMapHeight("65vh");
//       } else {
//         setMapHeight("80vh"); // Larger height for bigger screens
//       }
//     };

//     // Update height on component mount and window resize
//     updateHeight();
//     window.addEventListener("resize", updateHeight);

//     // Cleanup the event listener on component unmount
//     return () => window.removeEventListener("resize", updateHeight);
//   }, []);

//   return (
//     <section className="w-full">
//       <form
//         action=""
//         onSubmit={handleSubmit}
//         className="border rounded-2xl shadow-xl mb-4"
//       >
//         <div
//           id="First-Row"
//           className="flex m-8 flex-col md:flex-row md:items-center justify-center md:space-x-8 space-y-4 md:space-y-0"
//         >
//           <div className="w-full md:w-1/4 flex flex-col items-center">
//             <h3 className="text-center md:text-left mb-2 text-sm font-medium text-gray-700">
//               How many days are you willing to stay in Sri Lanka:
//             </h3>
//             <select
//               id="countries"
//               type="number"
//               required
//               onChange={(e) =>
//                 setFormData({ ...formData, destinationName: e.target.value })
//               }
//               value={formData.destinationName}
//               className="w-3/4 md:w-1/2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               {Array.from({ length: 31 }, (_, i) => (
//                 <option key={i}>{i + 1}</option>
//               ))}
//               <option>more than a month</option>
//             </select>
//           </div>

//           <div className="w-full md:w-1/4 flex flex-col items-center">
//             <h3 className="text-center md:text-left mb-2 text-sm font-medium text-gray-700">
//               Select the arrival date:
//             </h3>
//             <Datepicker className="w-3/4 md:w-1/2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
//           </div>

//           <div className="w-full md:w-1/4 flex flex-col items-center">
//             <h3 className="text-center md:text-left mb-2 text-sm font-medium text-gray-700">
//               Select the arrival time:
//             </h3>
//             <input
//               aria-label="Time"
//               type="time"
//               className="w-3/4 md:w-1/2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div className="w-full md:w-1/4 flex flex-col items-center">
//             <h3 className="text-center md:text-left mb-2 text-sm font-medium text-gray-700">
//               Select the departure date:
//             </h3>
//             <Datepicker className="w-3/4 md:w-1/2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
//           </div>
//         </div>
//         <div className="w-full flex justify-center mb-8">
//           <div className=" w-1/2">
//             <h3 className="text-center md:text-left mb-2 text-sm font-medium text-gray-700">
//               If you have any comments about the date please mention here:
//             </h3>
//             <TextInput
//               type="text"
//               placeholder="Any Comments about the date"
//               required
//               id="title"
//               className="flex-1"
//               onChange={(e) =>
//                 setFormData({ ...formData, destinationName: e.target.value })
//               }
//               value={formData.destinationName}
//             />
//           </div>
//         </div>
//         <div
//           id="Second-Row"
//           className="flex flex-col md:flex-row items-center mb-8"
//         >
//           <div className="w-1/2 h-full ">
//             <div className="h-full flex justify-center items-center">
//               <div
//                 id="floating-panel"
//                 className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
//               >
//                 <div className="mb-4">
//                   <label
//                     htmlFor="start"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Start:
//                   </label>
//                   <select
//                     id="start"
//                     className="w-full px-3 py-2 border border-yellow-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="">Select Start Location</option>
//                     <option value="Colombo">Colombo</option>
//                     <option value="Katunayake">Katunayake</option>
//                     {/* Other options... */}
//                   </select>
//                 </div>

//                 <div className="mb-4">
//                   <label
//                     htmlFor="waypoint1"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Waypoint 1 (Optional):
//                   </label>
//                   <select
//                     id="waypoint1"
//                     className="w-full px-3 py-2 border border-yellow-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="">None</option>
//                     <option value="Galle">Galle</option>
//                     <option value="Dambulla">Dambulla</option>
//                     {/* Other options... */}
//                   </select>
//                 </div>

//                 <div className="mb-4">
//                   <label
//                     htmlFor="waypoint2"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Waypoint 2 (Optional):
//                   </label>
//                   <select
//                     id="waypoint2"
//                     className="w-full px-3 py-2 border border-yellow-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="">None</option>
//                     <option value="Kandy">Kandy</option>
//                     <option value="Matara">Matara</option>
//                     {/* Other options... */}
//                   </select>
//                 </div>

//                 <div className="mb-4">
//                   <label
//                     htmlFor="waypoint3"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Waypoint 3 (Optional):
//                   </label>
//                   <select
//                     id="waypoint3"
//                     className="w-full px-3 py-2 border border-yellow-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="">None</option>
//                     <option value="Nuwara Eliya">Nuwara Eliya</option>
//                     <option value="Trincomalee">Trincomalee</option>
//                     {/* Other options... */}
//                   </select>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="end"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     End:
//                   </label>
//                   <select
//                     id="end"
//                     className="w-full px-3 py-2 border border-yellow-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="">Select End Location</option>
//                     <option value="Hambanthota">Hambanthota</option>
//                     <option value="Polonnaruwa">Polonnaruwa</option>
//                     {/* Other options... */}
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="w-1/2 flex justify-center">
//             <div style={{ height: mapHeight, width: "80%" }}>
//               <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API}>
//                 <Map
//                   zoom={zoom}
//                   center={position}
//                   mapId={import.meta.env.VITE_MAP_ID}
//                   fullscreenControl={false}
//                   streetViewControl={false}
//                   zoomControl={false}
//                   gestureHandling="none"
//                 >
//                   <Directions />
//                 </Map>
//               </APIProvider>
//             </div>
//           </div>
//         </div>

//         <div
//           id="Third-Row-Timeline-Activities"
//           className="mb-8 flex justify-center"
//         >
//           <div className="w-4/5">
//             <Timeline>
//               <Timeline.Item>
//                 <Timeline.Point />
//                 <Timeline.Content>
//                   <Timeline.Time>Day one</Timeline.Time>
//                   <Timeline.Title>Activity 1</Timeline.Title>
//                   <Timeline.Body>
//                     Get access to over 20+ pages including a dashboard layout,
//                     charts, kanban board, calendar, and pre-order E-commerce &
//                     Marketing pages.
//                   </Timeline.Body>
//                   <Button color="gray">
//                     Learn More
//                     <HiArrowNarrowRight className="ml-2 h-3 w-3" />
//                   </Button>
//                 </Timeline.Content>
//               </Timeline.Item>
//               <Timeline.Item>
//                 <Timeline.Point />
//                 <Timeline.Content>
//                   <Timeline.Time>Day one</Timeline.Time>
//                   <Timeline.Title>Activity 1</Timeline.Title>
//                   <Timeline.Body>
//                     Get access to over 20+ pages including a dashboard layout,
//                     charts, kanban board, calendar, and pre-order E-commerce &
//                     Marketing pages.
//                   </Timeline.Body>
//                   <Button color="gray">
//                     Learn More
//                     <HiArrowNarrowRight className="ml-2 h-3 w-3" />
//                   </Button>
//                 </Timeline.Content>
//               </Timeline.Item>
//             </Timeline>
//           </div>
//         </div>

//         <div id="Third-Row-Timeline-Activities" className="">
//           <SearchBar/>
//         </div>
//         <div id="Third-Row-Timeline-Activities" className="">
//           Vehicle Details
//         </div>
//       </form>
//     </section>
//   );
// }

// function Directions() {
//   const map = useMap();
//   const routesLibrary = useMapsLibrary("routes");
//   const [directionsService, setDirectionsService] = useState(null);
//   const [directionsRenderer, setDirectionsRenderer] = useState(null);
//   const [routes, setRoutes] = useState([]);
//   const [routeIndex, setRouteIndex] = useState(0);
//   const [hasRoute, setHasRoute] = useState(false); // To track if route is calculated

//   const selected = routes[routeIndex];
//   const leg = selected ? selected.legs[0] : null;

//   // Function to calculate the route
//   const calculateRoute = (start, waypointsArray, end) => {
//     if (!directionsService || !directionsRenderer || !start) return;

//     // Filter out any empty waypoints
//     const validWaypoints = waypointsArray
//       .filter((waypoint) => waypoint !== "")
//       .map((location) => ({ location, stopover: true }));

//     // Determine the destination:
//     // - Use end if available; otherwise, use the last waypoint
//     const destination =
//       end ||
//       (validWaypoints.length > 0 &&
//         validWaypoints[validWaypoints.length - 1].location);

//     if (!destination) return; // If no destination is available, do nothing

//     directionsService
//       .route({
//         origin: start,
//         destination: destination,
//         waypoints: validWaypoints,
//         travelMode: google.maps.TravelMode.DRIVING,
//         provideRouteAlternatives: true,
//       })
//       .then((response) => {
//         directionsRenderer.setDirections(response);
//         setRoutes(response.routes);
//         setHasRoute(true); // Set hasRoute to true after route is calculated
//       });
//   };

//   useEffect(() => {
//     if (!routesLibrary || !map) return;
//     setDirectionsService(new routesLibrary.DirectionsService());
//     setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
//   }, [routesLibrary, map]);

//   useEffect(() => {
//     if (!directionsService || !directionsRenderer) return;

//     const onChangeHandler = () => {
//       const start = document.getElementById("start").value;
//       const waypoint1 = document.getElementById("waypoint1").value;
//       const waypoint2 = document.getElementById("waypoint2").value;
//       const waypoint3 = document.getElementById("waypoint3").value;
//       const end = document.getElementById("end").value;

//       // Calculate route as soon as start and any waypoint or end is selected
//       if (start && (waypoint1 || waypoint2 || waypoint3 || end)) {
//         calculateRoute(start, [waypoint1, waypoint2, waypoint3], end); // Pass all waypoints to the route calculation
//       }
//     };

//     document
//       .getElementById("start")
//       .addEventListener("change", onChangeHandler);
//     document
//       .getElementById("waypoint1")
//       .addEventListener("change", onChangeHandler);
//     document
//       .getElementById("waypoint2")
//       .addEventListener("change", onChangeHandler);
//     document
//       .getElementById("waypoint3")
//       .addEventListener("change", onChangeHandler);
//     document.getElementById("end").addEventListener("change", onChangeHandler);

//     // Clean up event listeners on component unmount
//     return () => {
//       document
//         .getElementById("start")
//         .removeEventListener("change", onChangeHandler);
//       document
//         .getElementById("waypoint1")
//         .removeEventListener("change", onChangeHandler);
//       document
//         .getElementById("waypoint2")
//         .removeEventListener("change", onChangeHandler);
//       document
//         .getElementById("waypoint3")
//         .removeEventListener("change", onChangeHandler);
//       document
//         .getElementById("end")
//         .removeEventListener("change", onChangeHandler);
//     };
//   }, [directionsService, directionsRenderer]);

//   useEffect(() => {
//     if (!directionsRenderer || !hasRoute) return;
//     directionsRenderer.setRouteIndex(routeIndex);
//   }, [routeIndex, directionsRenderer, hasRoute]);

//   if (!hasRoute || !leg) return null; // Don't show directions unless a route is calculated
// }
