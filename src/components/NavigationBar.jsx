import { Navbar, Dropdown, Avatar } from "flowbite-react";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import gsap from "gsap";
import "../index.css";

export default function NavigationBar() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navContainerRef = useRef(null);

  // Scroll effect for navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      setCurrentScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 1.4,
    });
  }, [isNavVisible]);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(mobileMenuRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 });
    } else {
      gsap.to(mobileMenuRef.current, { opacity: 0, y: -20, duration: 0.3 });
    }
  }, [menuOpen]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", { method: "POST" });
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

  return (
    <nav ref={navContainerRef} className="fixed w-full z-50 bg-transparent backdrop-blur-md shadow-md">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between">
      <div className="flex flex-1 items-center justify-start">
        <Link to="/">
          <img
            className="h-8 w-auto"
            src="https://firebasestorage.googleapis.com/v0/b/renuka-travels-and-tours.appspot.com/o/logo.png?alt=media&token=a7e8b83d-3459-463c-8a41-5439ec0b3f27"
            alt="Company Logo"
          />
        </Link>
      </div>

      <div className="hidden sm:flex space-x-6 justify-center w-full">
        <Link to="/" className="text-black font-bold hover:text-yellow-400 transition duration-300">Home</Link>
        <Link to="/destinations" className="text-black font-bold hover:text-yellow-400 transition duration-300">Destinations</Link>
        <Link to="/tours" className="text-black font-bold hover:text-yellow-400 transition duration-300">Featured Tours</Link>
        <Link to="/gallery" className="text-black font-bold hover:text-yellow-400 transition duration-300">Gallery</Link>
        <Link to="/services" className="text-black font-bold hover:text-yellow-400 transition duration-300">Our Services</Link>
        <Link to="/about" className="text-black font-bold hover:text-yellow-400 transition duration-300">About Us</Link>
      </div>

      <div className="sm:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {currentUser ? (
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="user" img={currentUser.profilePicture} rounded />}
        >
          <Dropdown.Header>
            <span className="block text-sm">@{currentUser.username}</span>
            <span className="block text-sm font-medium truncate">{currentUser.email}</span>
          </Dropdown.Header>
          <Link to="/dashboard?tab=dash"><Dropdown.Item className="text-black font-bold">Dashboard</Dropdown.Item></Link>
          <Link to="/dashboard?tab=profile"><Dropdown.Item className="text-black font-bold">Profile</Dropdown.Item></Link>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleSignout} className="text-black font-bold">Sign Out</Dropdown.Item>
        </Dropdown>
      ) : (
        <div className="flex space-x-4">
          <Link to="/signin" className="text-black font-bold hover:text-yellow-400 transition duration-300">Log In</Link>
          <Link to="/register" className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition duration-300">Register</Link>
        </div>
      )}
    </div>
  </div>

  {menuOpen && (
    <div ref={mobileMenuRef} className="sm:hidden absolute w-full bg-gray-900 bg-opacity-90 py-4 flex flex-col space-y-4 text-center text-white">
      <Link to="/" onClick={() => setMenuOpen(false)} className="text-black font-bold hover:text-yellow-400">Home</Link>
      <Link to="/destinations" onClick={() => setMenuOpen(false)} className="text-black font-bold hover:text-yellow-400">Destinations</Link>
      <Link to="/tours" onClick={() => setMenuOpen(false)} className="text-black font-bold hover:text-yellow-400">Featured Tours</Link>
      <Link to="/gallery" onClick={() => setMenuOpen(false)} className="text-black font-bold hover:text-yellow-400">Gallery</Link>
      <Link to="/services" onClick={() => setMenuOpen(false)} className="text-black font-bold hover:text-yellow-400">Our Services</Link>
      <Link to="/about" onClick={() => setMenuOpen(false)} className="text-black font-bold hover:text-yellow-400">About Us</Link>
      {!currentUser && <Link to="/signin" onClick={() => setMenuOpen(false)} className="text-black font-bold hover:text-yellow-400">Log In</Link>}
      {currentUser && <Link onClick={() => { setMenuOpen(false); handleSignout(); }} className="text-black font-bold hover:text-yellow-400">Log Out</Link>}
    </div>
  )}
</nav>

  );
}
