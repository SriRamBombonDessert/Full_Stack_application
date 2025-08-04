"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MenuCard from "./MenuCard"
import FilterTabs from "./FilterTabs"

const CustomerView = ({ menuItems }) => {
  const [filteredItems, setFilteredItems] = useState([])
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const categories = [
    "All",
    "Waffles",
    "Ice Cream",
    "Brownies",
    "Frappuccino",
    "Boba & Milkshakes",
    "Coffee & Tea",
    "Snacks",
    "Special",
  ]

  useEffect(() => {
    let filtered = menuItems

    if (activeCategory !== "All") {
      filtered = filtered.filter((item) => item.category === activeCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    setFilteredItems(filtered)
  }, [menuItems, activeCategory, searchTerm])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-90"></div>
        <div className="relative backdrop-blur-sm bg-white/10 border-b border-white/20">
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">BOMBÓN DESSERT</h1>
              <p className="text-xl md:text-2xl text-white/90 font-light tracking-widest">
                'HAPPINESS SERVED ON A PLATE'
              </p>
              <div className="mt-6 flex justify-center space-x-4 text-white/80">
                <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">Dine In</span>
                <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">Take Out</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Search Bar */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="container mx-auto px-4 py-6"
      >
        <div className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search delicious items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-full bg-white/70 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent shadow-lg text-gray-800 placeholder-gray-500"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <FilterTabs categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      {/* Menu Items Grid */}
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredItems.map((item, index) => (
              <MenuCard key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="text-6xl mb-4">🍰</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your search or filter</p>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">BOMBÓN DESSERT</h3>
          <p className="text-white/80">Made with ❤️ for dessert lovers</p>
        </div>
      </footer>
    </div>
  )
}

export default CustomerView
