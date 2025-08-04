"use client"

const categories = [
  { id: "all", label: "All Items", icon: "🍽️" },
  { id: "waffles", label: "Waffles", icon: "🧇" },
  { id: "ice-cream", label: "Ice Cream", icon: "🍦" },
  { id: "brownies", label: "Brownies", icon: "🍫" },
  { id: "drinks", label: "Drinks", icon: "🥤" },
  { id: "coffee", label: "Coffee", icon: "☕" },
  { id: "food", label: "Food", icon: "🍟" },
  { id: "specials", label: "Specials", icon: "⭐" },
]

function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            selectedCategory === category.id
              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
              : "bg-white/70 backdrop-blur-sm border border-white/20 text-gray-700 hover:bg-white/90"
          }`}
        >
          <span>{category.icon}</span>
          {category.label}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
