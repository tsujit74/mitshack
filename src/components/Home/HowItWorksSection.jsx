import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Choose Your Event",
    description:
      "Select the type of event you want to plan, whether it's a wedding, birthday, or cradle ceremony.",
    icon: "📅",
  },
  {
    title: "Select Services",
    description:
      "Pick the services that fit your needs, from makeup to photography, catering, and more.",
    icon: "🎨",
  },
  {
    title: "Book & Celebrate",
    description:
      "Confirm your bookings and get ready for your special day. We'll take care of the rest!",
    icon: "🎉",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-indigo-800 to-purple-700 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold mb-12 text-yellow-300 drop-shadow-lg"
        >
          How It Works
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative bg-white shadow-2xl rounded-2xl overflow-hidden hover:scale-105 transform transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-800 text-white p-8 text-center">
                <div className="text-6xl mb-4">{step.icon}</div>
                <h3 className="text-2xl font-semibold">{step.title}</h3>
              </div>
              <div className="p-6 bg-white text-center">
                <p className="mt-2 text-gray-700">{step.description}</p>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
