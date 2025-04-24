import React from "react";
import { motion } from "framer-motion";
import heroBg from "../../assets/hero.jpeg";

const events = [
  {
    title: "Weddings",
    description: "Elegance and charm for your big day",
    image: "/images/Hero.jpg",
  },
  {
    title: "Birthdays",
    description: "Celebrate another beautiful year of life",
    image: "/images/baby.jpg",
  },
  {
    title: "Cradle Ceremony",
    description: "Celebrate your little one's first moments",
    image: "/images/cradle.jpg",
  },
];

const Events = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-indigo-800 to-purple-700 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold mb-12 text-yellow-300 drop-shadow-lg"
        >
          Explore Our Events
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative rounded-xl overflow-hidden bg-white shadow-lg"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 drop-shadow-md">
                  {event.title}
                </h3>
                <p className="mt-2 text-gray-700">{event.description}</p>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
