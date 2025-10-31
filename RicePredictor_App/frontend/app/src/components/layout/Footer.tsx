{/* <div className="border-t py-2 text-center">© 2025 Pharmacy System</div> */}

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 dark:bg-[#030712] dark:text-gray-400 text-center text-sm text-gray-600 py-4 mt-10 border-t border-t-gray-50 dark:border-t-gray-600">
      <div className="max-w-7xl mx-auto px-4">
        <p>© {new Date().getFullYear()} Rice Prediction</p>
      </div>
    </footer>
  );
};

export default Footer;
