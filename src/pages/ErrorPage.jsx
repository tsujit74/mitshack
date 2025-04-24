import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer); // Clear the timer once the countdown hits 0
          navigate("/choose-event"); // Redirect to home page
        }
        return prev - 1;
      });
    }, 1000); // Update countdown every second

    return () => clearInterval(timer); // Clean up interval on unmount
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex flex-col items-center justify-center p-6 mt-14">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-6xl font-extrabold text-red-600 mb-4">Oops!</h1>
        <p className="text-xl text-gray-800 mb-6">
          Something went wrong, but don't worry – we are redirecting you to the home page.
        </p>
        <motion.div
          className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-3xl cursor-pointer mb-6"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/choose-event")}
        >
          <span>🏠</span> {/* Home Icon */}
        </motion.div>
        <p className="text-lg text-gray-600">
          Redirecting you in <span id="countdown">{countdown}</span> seconds...
        </p>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
