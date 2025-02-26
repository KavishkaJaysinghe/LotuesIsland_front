import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashHotels from "../components/DashHotels";
import DashUsers from "../components/DashUsers";
import DashboardComp from "../components/DashboardComp";
import DashDestinations from "../components/DashDestinations";
import DashTours from "../components/featuredTours/DashTours";
import DashCreateTours from "../components/featuredTours/DashCreateTour";
import DashVehicles from "../components/VehicleComp/DashVehicles";
import DashBookings from "../components/DashBookings";
import DashCreateVehicle from "../components/VehicleComp/DashCreateVehicle";
import DashGallery from "../components/DashGallery";
import DashReviews from "../components/DashReviews";

function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const renderContent = () => {
    switch (tab) {
      case "profile":
        return <DashProfile />;
      case "hotels":
        return <DashHotels />;
      case "users":
        return <DashUsers />;
      case "dash":
        return <DashboardComp />;
      case "destinations":
        return <DashDestinations />;
      case "tours":
        return <DashTours />;
      case "createtour":
        return <DashCreateTours />;
      case "vehicles":
        return <DashVehicles />;
      case "createvehicle":
        return <DashCreateVehicle />;
      case "bookings":
        return <DashBookings />;
      case "gallery":
        return <DashGallery />;
        case "reviews":
        return <DashReviews />;
      default:
        return <DashboardComp />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Mobile Layout */}
      {isMobile && (
        <div className="flex flex-col w-full">
          <div className="w-full mb-4">
            <DashSidebar />
          </div>
          <div className="w-full">{renderContent()}</div>
        </div>
      )}

      {/* Desktop Layout */}
      {!isMobile && (
        <div className="flex flex-row py-8 shadow-xl">
          <div className="w-56">
            <DashSidebar />
          </div>
          <div className="flex-1 pl-4">{renderContent()}</div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;
