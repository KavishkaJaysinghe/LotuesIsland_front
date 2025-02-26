import React, { useState } from "react";
import {Alert, Button, Label, TextInput, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import signupImg from "../images/Signup.png";
import signupImg2 from "../images/signip1.png";
import OAuth from "../components/OAuth";

export default function Register() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all required fields');
    } 
    try {
      const res = await fetch("/api/auth/signup", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);

      if (res.ok) {
        navigate('/signin');
      }
      
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  
  

  const handleGoogleClick = () => {
    // handle Google click logic
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 overflow-hidden relative">
      <img
        src={signupImg}
        alt="Signup"
        className="w-full h-56 md:h-96 object-cover absolute top-0 left-0 z-0"
      />

      <div className="section flex flex-col md:flex-row items-center p-6 max-w-4xl mx-auto gap-8 bg-white shadow-md rounded-lg relative z-10 mt-40 md:mt-20">
        {/* Left */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-center text-xl mx-3 font-semibold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent dark:from-green-400 dark:to-blue-500">
            Sign up now to start crafting your personalized Sri Lankan adventure
            today!
          </h1>

          <div className="flex justify-center md:justify-start">
            <Link
              to="/"
              className="text-6xl font-bold text-gray-800 flex items-center"
            >
              <img
                className="mt-6 h-56 w-auto md:h-72 lg:h-96"
                src={signupImg2}
                alt="Signup Visual"
              />
            </Link>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form
            className="flex flex-col gap-4 p-6 bg-custom-orange rounded-lg"
            onSubmit={handleSubmit}
          >
            <p className="text-sm mt-2 text-gray-600 text-center">
              You can sign up with your email and password or with your Google
              account!
            </p>
            <div>
              <Label value="Your Username" className="text-gray-700" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
                className="border-gray-300"
              />
            </div>
            <div>
              <Label
                value="Your Email"
                className="text-gray-700 dark:text-gray-300"
              />
              <TextInput
                type="email"
                placeholder="name@example.com"
                id="email"
                onChange={handleChange}
                className="border-gray-300"
              />
            </div>
            <div>
              <Label
                value="Your Password"
                className="text-gray-700 dark:text-gray-300"
              />
              <TextInput
                type="password"
                placeholder="**********"
                id="password"
                onChange={handleChange}
                className="border-gray-300"
              />
            </div>
            <Button
              gradientDuoTone="purpleToBlue"
              type="submit"
              className="bg-blue-500 text-white border border-white"
            >
               {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading....</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5 text-gray-600 dark:text-gray-300">
            <span>Have an account already?</span>
            <Link to="/signin" className="text-blue-500 dark:text-blue-400">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </motion.div>
      </div>
    </div>
  );
}
