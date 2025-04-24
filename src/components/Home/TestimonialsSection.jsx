import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Jane Doe",
    event: "Wedding",
    feedback:
      "EventEase made our wedding day truly special. The attention to detail and seamless coordination made everything perfect!",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR32g-r99Tc-rrI29wlHF-FVF6P-thIEKgU0w&s", // Replace with actual image or use assets
  },
  {
    name: "John Smith",
    event: "Birthday",
    feedback:
      "I couldn't have asked for a better birthday celebration. The team at EventEase took care of everything from start to finish.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7AR5iFpr7tkS-WPgmKJ-sh9T110WhV5k4Kg&s", // Replace with actual image or use assets
  },
  {
    name: "Alice Brown",
    event: "Cradle Ceremony",
    feedback:
      "Our cradle ceremony was beautiful thanks to EventEase. Every moment was thoughtfully planned, and the day went off without a hitch.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9jw5HyR6n8UFBopxdDsCn0ZoCgaadYXpRVw&s", // Replace with actual image or use assets
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold mb-12 text-yellow-300 drop-shadow-lg"
        >
          What Our Clients Say
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative bg-white shadow-xl rounded-2xl overflow-hidden hover:scale-105 transform transition-all duration-300"
            >
              <div className="p-6 bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-800 text-white text-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white"
                />
                <h3 className="text-2xl font-semibold">{testimonial.name}</h3>
                <p className="text-lg text-gray-200">{testimonial.event}</p>
              </div>
              <div className="p-6 bg-white text-center">
                <p className="mt-2 text-gray-700 italic">
                  "{testimonial.feedback}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
