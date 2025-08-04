"use client"
import { motion } from "framer-motion"

const AdminMenuCard = ({ item, onEdit, onDelete }) => {
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
    <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="text-3xl">{getItemIcon(item.category)}</div>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(item)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(item.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <h3 className="font-bold text-gray-800 mb-2">{item.name}</h3>
        <p className="text-sm text-gray-500 mb-2 capitalize">{item.category}</p>

        {item.description && <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            {item.originalPrice ? (
              <div className="flex items-center space-x-2">
                <span className="font-bold text-green-600">₹{item.price}</span>
                <span className="text-sm text-gray-400 line-through">₹{item.originalPrice}</span>
              </div>
            ) : (
              <span className="font-bold text-gray-800">₹{item.price}</span>
            )}
          </div>

          {/* Badges */}
          <div className="flex space-x-1">
            {item.isSpecial && (
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Special</span>
            )}
            {item.originalPrice && (
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Offer</span>
            )}
          </div>
        </div>

        {/* Sizes */}
        {item.sizes && item.sizes.length > 0 && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {item.sizes.map((size, idx) => (
                <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {size}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default AdminMenuCard
