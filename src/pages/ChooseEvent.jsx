import React from "react";
import { Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const eventTypes = [
  {
    name: "Wedding",
    image: "/images/wedding.jpg",
    path: "/wedding-event",
  },
  {
    name: "Baby Functions",
    image: "/images/baby.jpg",
    path: "/birthday-event",
  },
  {
    name: "College Fest",
    image: "/images/college.jpg",
    path: "/college-event",
  },
  // {
  //   name: "Cardle Event",
  //   image: "/images/cradle.jpg",
  //   path: "/cardle-event",
  // },
  {
    name: "House Event",
    image: "/images/house.jpg",
    path: "/house-event",
  },
  {
    name: "Corporate Event",
    image: "/images/corporate.jpg",
    path: "/corporate-event",
  },
];

const ChooseEvent = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-6 flex flex-col items-center">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
    >
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl w-full">
        {eventTypes.map((event, index) => (
          <motion.div
            key={event.name}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onClick={() => navigate(event.path)}
            className="cursor-pointer"
          >
            <Card className="shadow-xl rounded-2xl overflow-hidden transition-transform duration-300 hover:shadow-2xl">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-48 object-cover"
              />
              <CardContent className="text-center bg-white">
                <p className="text-xl font-semibold text-gray-800">{event.name}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ChooseEvent;
