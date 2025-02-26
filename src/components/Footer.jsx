import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#fefcfb] py-12 px-8 max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4 text-center lg:text-left">
          {/* Logo and Social Media */}
          <div className="w-full lg:w-1/4 px-4 mb-8 lg:mb-0">
            <div className="mb-4">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/renuka-travels-and-tours.appspot.com/o/logo.png?alt=media&token=a7e8b83d-3459-463c-8a41-5439ec0b3f27"
                alt="Company Logo"
                className="w-24 lg:w-44 mx-auto lg:mx-0"
              />
              <p className="text-gray-600 mt-4">
                Enhancing experiences through innovation and trust.
              </p>
              <div className="flex justify-center lg:justify-start gap-4 mt-4 text-gray-700">
                <Link to="#" className="text-2xl">
                  <i className="ri-twitter-line"></i>
                </Link>
                <Link to="#" className="text-2xl">
                  <i className="ri-instagram-line"></i>
                </Link>
                <Link to="#" className="text-2xl">
                  <i className="ri-youtube-line"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Explore More */}
          <div className="w-full lg:w-1/4 px-4 mb-8 lg:mb-0">
            <h5 className="text-lg font-bold text-gray-800 mb-4">Explore More</h5>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-gray-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-gray-600"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/tours"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-gray-600"
                >
                  Tours
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-gray-600"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="w-full lg:w-1/4 px-4 mb-8 lg:mb-0">
            <h5 className="text-lg font-bold text-gray-800 mb-4">Contact</h5>
            <ul className="space-y-2 text-gray-600">
              <li>
                <span>Email: </span>
                <a
                  href="mailto:renukatoursandtravels1@gmail.com"
                  className="hover:underline"
                >
                  renukatoursandtravels1@gmail.com
                </a>
              </li>
              <li>Phone: +94 77 926 4693</li>
            </ul>
          </div>

          {/* Legal and Policies */}
          <div className="w-full lg:w-1/4 px-4 mb-8 lg:mb-0">
            <h5 className="text-lg font-bold text-gray-800 mb-4">Legal</h5>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-gray-600"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-gray-600"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center py-6">
          <p className="text-gray-600">
            &copy; {year} Renuka Tours & Travels. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
