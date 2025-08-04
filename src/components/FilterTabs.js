"use client"
import { motion } from "framer-motion"

const FilterTabs = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category)}
            className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeCategory === category
                ? "text-white shadow-lg"
                : "text-gray-600 bg-white/70 backdrop-blur-sm border border-white/30 hover:bg-white/90"
            }`}
          >
            {activeCategory === category && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default FilterTabs
