import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function PathBreadcrumb() {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);

  // Define paths including "Anasayfa" as the root
  const paths = [
    { name: "Anasayfa", to: "/" },
    ...parts.map((part, index) => {
      const to = "/" + parts.slice(0, index + 1).join("/");
      return {
        name: decodeURIComponent(part.replace(/-/g, " ")),
        to,
      };
    }),
  ];

  // Animation variants for breadcrumb items
  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { scale: 1.05, color: "#4f46e5", transition: { duration: 0.2 } },
  };

  return (
    <div className="text-sm text-gray-400 mb-6 font-medium bg-gradient-to-r from-[#1a1f2e]/10 to-[#252e3b]/10 px-4 py-2 rounded-lg shadow-sm">
      {paths.map((item, index) => (
        <span key={index} className="inline-flex items-center">
          {index > 0 && <span className="mx-2 text-gray-500">/</span>}
          <motion.span
            variants={itemVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <Link
              to={item.to}
              className="capitalize hover:text-[#4f46e5] transition-colors duration-200"
            >
              {item.name}
            </Link>
          </motion.span>
        </span>
      ))}
    </div>
  );
}

export default PathBreadcrumb;
