import { Sidebar, Dropdown } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiOutlineUserGroup,
  HiUser,
  HiMenu,
  HiOutlineStar,
} from "react-icons/hi";
import {
  FaHotel,
  FaMapMarkerAlt,
  FaPlaneDeparture,
  FaImages,
} from "react-icons/fa";
import { MdDirectionsCar, MdAssignment } from "react-icons/md";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function DashSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

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

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const menuItems = [
    currentUser.isAdmin && {
      name: "Dashboard",
      path: "dash",
      icon: HiChartPie,
    },
    {
      name: "Profile",
      path: "profile",
      icon: HiUser,
    },
    currentUser.isAdmin && {
      name: "Hotels",
      path: "hotels",
      icon: FaHotel,
    },
    currentUser.isAdmin && {
      name: "Destinations",
      path: "destinations",
      icon: FaMapMarkerAlt,
    },
    currentUser.isAdmin && {
      name: "Tours",
      path: "tours",
      icon: FaPlaneDeparture,
    },
    currentUser.isAdmin && {
      name: "Gallery",
      path: "gallery",
      icon: FaImages,
    },
    !currentUser.isAdmin && {
      name: "My Travel Plans",
      path: "travel-plans",
      icon: FaMapMarkerAlt,
    },
    currentUser.isAdmin && {
      name: "Vehicles",
      path: "vehicles",
      icon: MdDirectionsCar,
    },
    currentUser.isAdmin && {
      name: "Bookings",
      path: "bookings",
      icon: MdAssignment,
    },
    currentUser.isAdmin && {
      name: "Users",
      path: "users",
      icon: HiOutlineUserGroup,
    },
    currentUser.isAdmin && {
      name: "Reviews",
      path: "reviews",
      icon: HiOutlineStar,
    },
  ].filter(Boolean);

  const handleTabChange = (path) => {
    navigate(`/dashboard?tab=${path}`);
  };

  if (isMobile) {
    return (
      <div className="p-4">
        <Dropdown
          label={
            <div className="flex items-center gap-2">
              <HiMenu className="text-xl" />
              <span>{menuItems.find((item) => item.path === tab)?.name || "Menu"}</span>
            </div>
          }
          className="w-full"
        >
          {menuItems.map((item) => (
            <Dropdown.Item
              key={item.path}
              onClick={() => handleTabChange(item.path)}
              icon={() => <item.icon className="text-orange-400" />}
            >
              {item.name}
            </Dropdown.Item>
          ))}
          <Dropdown.Item
            onClick={handleSignout}
            icon={() => <HiArrowSmRight className="text-orange-400" />}
          >
            Sign Out
          </Dropdown.Item>
        </Dropdown>
      </div>
    );
  }

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <Sidebar.Item
              key={item.path}
              as={Link}
              to={`/dashboard?tab=${item.path}`}
              active={tab === item.path || (!tab && item.path === "dash")}
              icon={() => <item.icon className="text-orange-400" />}
              label={item.path === "profile" ? (currentUser.isAdmin ? "Admin" : "User") : undefined}
            >
              {item.name}
            </Sidebar.Item>
          ))}
          <Sidebar.Item
            icon={() => <HiArrowSmRight className="text-orange-400" />}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}