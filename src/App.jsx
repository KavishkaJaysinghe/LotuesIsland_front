import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import Register from "./pages/Register";
import DestinationDetails from "./pages/DestinationDetails";
import Hotels from "./pages/Hotels";
import Vehicles from "./pages/Vehicles";
import Tours from "./pages/Tours";
import TourDetails from "./pages/TourDetails";
import UpdateTour from "./components/featuredTours/UpdateTours";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import UpdateDestination from "./pages/UpdateDestination";
import HotelDetails from "./components/hotelpages/HotelDetails";
import InputHotel from "./components/hotelpages/InputHotel";
import ContactUs from "./pages/ContactUs";
import UpdateVehicle from "./components/VehicleComp/UpdateVehicle";
import Gallery from "./pages/Gallery";
import NewHomePage from "./pages/NewHomePage";
import NavigationBar from "./components/NavigationBar";
import CustomizeForm from "./pages/CustomizeForm";
import OurServices from "./pages/OurServices";
import DestinationHome from "./pages/DestinationsHome";
import WriteReview from "./components/Review/write";
import ReviewsSection from "./components/Review/ReviewComp";

export default function App() {
  return (
    <div className="body-color">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<NewHomePage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/tours" element={<Tours />}></Route>
          <Route path="services" element={<OurServices />}></Route>
          <Route path="/destinations" element={<DestinationHome />}></Route>
          <Route path="/write-review" element={<WriteReview />}></Route>
          <Route path="/reviews" element={<ReviewsSection />}></Route>
          <Route
            path="/destinations/:destSlug"
            element={<DestinationDetails />}
          ></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/customize" element={<CustomizeForm />}></Route>
          </Route>
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route
              path="/update-destination/:destId"
              element={<UpdateDestination />}
            ></Route>
            <Route
              path="/update-vehicle/:vehicleId"
              element={<UpdateVehicle />}
            ></Route>
          </Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/hotels" element={<Hotels />}></Route>
          <Route path="/vehicles" element={<Vehicles />}></Route>
          <Route path="/tours" element={<Tours />}></Route>
          <Route path='/update-tour/:tourId' element={<UpdateTour />} />
          <Route path="/tours/:id" element={<TourDetails />}></Route>
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/add-hotel" element={<InputHotel />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
