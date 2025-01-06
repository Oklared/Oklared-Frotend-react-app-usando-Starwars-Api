import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-yellow-500 via-red-500 to-black text-white p-4">
      <div className="max-w-screen-lg mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-yellow-300 hover:text-yellow-500 transition-colors">
          Star Wars API
        </h1>
        <ul className="flex space-x-8">
          <li>
            <Link
              to="/films"
              className="text-lg hover:text-yellow-400 transition-all transform hover:scale-110"
            >
              Films
            </Link>
          </li>
          <li>
            <Link
              to="/characters"
              className="text-lg hover:text-yellow-400 transition-all transform hover:scale-110"
            >
              Characters
            </Link>
          </li>
          <li>
            <Link
              to="/planets"
              className="text-lg hover:text-yellow-400 transition-all transform hover:scale-110"
            >
              Planets
            </Link>
          </li>
          <li>
            <Link
              to="/starships"
              className="text-lg hover:text-yellow-400 transition-all transform hover:scale-110"
            >
              Starships
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              className="text-lg hover:text-yellow-400 transition-all transform hover:scale-110"
            >
              Favorites
            </Link>
          </li>
        </ul>
        <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-600 transition-all shadow-lg transform hover:scale-105">
          <Link to="/login">Sign In</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
