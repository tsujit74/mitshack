import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4 fixed left-0 top-0">
      <h2 className="text-2xl font-bold mb-4">Event Manager</h2>
      <div className="space-y-4">
        <Link to="/wedding-event" className="block hover:bg-gray-700 p-2 rounded">
          Wedding Event
        </Link>
        <Link to="/birthday-event" className="block hover:bg-gray-700 p-2 rounded">
          Birthday Event
        </Link>
        <Link to="/college-event" className="block hover:bg-gray-700 p-2 rounded">
          College Event
        </Link>
        <Link to="/cardle-event" className="block hover:bg-gray-700 p-2 rounded">
          Cardle Event
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
