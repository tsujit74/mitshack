import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ChatWithEventEase from "../ChatWithEventEase";
import heroBg from "../../assets/hero.jpeg";
import LoginPopup from "../LoginSignupPopup/LoginPopup";
import SignupPopup from "../LoginSignupPopup/SignupPopup";

const Hero = ({ isLoggedIn, onLoginOpen }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleForm = () => setIsLogin(!isLogin);

  const handleExploreClick = () => {
    if (isLoggedIn) {
      navigate("/choose-event");
    } else {
      toggleModal();
    }
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      isLoggedIn = true;
    }
  }, []);

  const [showChat, setShowChat] = useState(false);

  return (
    <section
      className="relative w-full h-screen text-white overflow-hidden pt-16"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/60 to-indigo-900/70 z-0" />

      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center md:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-xl">
              Celebrate Life's Moments
              <br />
              <span className="text-yellow-300">With Ease & Elegance</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-lg mx-auto md:mx-0">
              From intimate ceremonies to grand galas, EventEase helps you
              create memories that last a lifetime.
            </p>
            <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
              <button
                onClick={handleExploreClick}
                className="px-6 py-3 bg-yellow-300 text-black rounded-full font-semibold shadow-lg hover:bg-yellow-400 transition-all duration-200"
                aria-label="Explore Events"
              >
                Explore Events
              </button>
              <button
                onClick={() => setShowChat(true)}
                className="px-6 py-3 border border-yellow-300 text-yellow-300 rounded-full font-semibold hover:bg-yellow-300 hover:text-black transition-all duration-200"
              >
                Ask EventEase
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden md:block"
          >
            <div className="w-full max-w-sm mx-auto backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20 shadow-2xl">
              <p className="text-xl font-semibold mb-2">
                ✨ Your perfect event starts here
              </p>
              <p className="text-sm text-white/80">
                Book your dream venue, services, and experiences — all in one
                place.
              </p>
              <button
                onClick={handleExploreClick}
                className="mt-4 w-full py-2 bg-yellow-300 text-black rounded-full font-bold hover:bg-yellow-400 transition"
                aria-label="Get Started"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-sm w-full">
            {isLogin ? (
              <LoginPopup
                toggleForm={toggleForm}
                closeModal={toggleModal}
                onLoginSuccess={(email) => {
                  localStorage.setItem("userEmail", email);
                  setIsModalOpen(false);
                }}
              />
            ) : (
              <SignupPopup toggleForm={toggleForm} closeModal={toggleModal} />
            )}
          </div>
        </div>
      )}
      {showChat && <ChatWithEventEase onClose={() => setShowChat(false)} />}
    </section>
  );
};

export default Hero;
