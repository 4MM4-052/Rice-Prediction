import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import logImg from "../../assets/logo1.png";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [touchedLink, setTouchedLink] = useState<string | null>(null);
  const location = useLocation();
  const path = location.pathname;

  const getLinkClass = (target: string) =>
    `hover:underline transition-colors duration-200 ${
      path === target
        ? "text-[#0ea5e9] dark:text-[#7dd3fc] font-semibold underline"
        : ""
    }`;

  const getLinkMobile = (target: string) =>
    path === target
      ? "block py-4 px-4 bg-gray-300 dark:bg-gray-800 text-blue-700 dark:text-[#7dd3fc] font-semibold"
      : `block py-4 px-4 transition-all duration-200 ${
          touchedLink === target ? "bg-gray-100 dark:bg-gray-700" : ""
        }`;

  return (
    <header className="bg-gray-200 dark:bg-[#030712] text-dark dark:text-white w-full fixed top-0 z-50 border-b border-b-gray-50 dark:border-b-gray-600">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold"
        >
<div className="flex items-center gap-4">
  <img
    src={logImg}
    alt="Logo"
    className="w-16 h-16 md:w-20 md:h-20 object-contain"
  />
  <span className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
    RicePredictor
  </span>
</div>

        </Link>

        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className={getLinkClass("/")} style={{ fontSize: "18px" }}>
              Trang chủ
            </Link>
            <Link to="/predict" className={getLinkClass("/predict")} style={{ fontSize: "18px" }}>
              Dự đoán
            </Link>
          </nav>
        </div>
      
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 text-dark dark:text-white border-t border-b">
          <Link
            to="/"
            className={getLinkMobile("/")}
            onClick={() => setMenuOpen(false)}
            onTouchStart={() => setTouchedLink("/")}
            onTouchEnd={() => setTouchedLink(null)}
          >
            Trang chủ
          </Link>
          <Link
            to="/predict"
            className={getLinkMobile("/predict")}
            onClick={() => setMenuOpen(false)}
            onTouchStart={() => setTouchedLink("/predict")}
            onTouchEnd={() => setTouchedLink(null)}
          >
            Dự đoán
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
