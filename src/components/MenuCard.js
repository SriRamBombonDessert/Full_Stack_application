"use client"
import { motion } from "framer-motion"

const MenuCard = ({ item, index }) => {
  const getItemIcon = (category) => {
    const icons = {
      Waffles: "🧇",
      "Ice Cream": "🍦",
      Brownies: "🍫",
      Frappuccino: "🥤",
      "Boba & Milkshakes": "🧋",
      "Coffee & Tea": "☕",
      Snacks: "🍟",
      Special: "⭐",
    }
    return icons[category] || "🍰"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300">
        {/* Special Badge */}
        {item.isSpecial && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              SPECIAL
            </span>
          </div>
        )}

        {/* Offer Badge */}
        {item.originalPrice && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              OFFER
            </span>
          </div>
        )}

        {/* Card Content */}
        <div className="p-6">
          {/* Icon */}
          <div className="text-4xl mb-4 text-center">{getItemIcon(item.category)}</div>

          {/* Item Name */}
          <h3 className="text-lg font-bold text-gray-800 mb-2 text-center group-hover:text-purple-600 transition-colors">
            {item.name}
          </h3>

          {/* Category */}
          <p className="text-sm text-gray-500 text-center mb-3 capitalize">{item.category}</p>

          {/* Description */}
          {item.description && (
            <p className="text-sm text-gray-600 text-center mb-4 line-clamp-2">{item.description}</p>
          )}

          {/* Price */}
          <div className="text-center">
            {item.originalPrice ? (
              <div className="space-y-1">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg font-bold text-green-600">₹{item.price}</span>
                  <span className="text-sm text-gray-400 line-through">₹{item.originalPrice}</span>
                </div>
                <div className="text-xs text-red-500 font-medium">Save ₹{item.originalPrice - item.price}</div>
              </div>
            ) : (
              <span className="text-xl font-bold text-gray-800">₹{item.price}</span>
            )}
          </div>

          {/* Sizes */}
          {item.sizes && item.sizes.length > 0 && (
            <div className="mt-4">
              <div className="flex flex-wrap gap-1 justify-center">
                {item.sizes.map((size, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      </div>
    </motion.div>
  )
}

export default MenuCard
