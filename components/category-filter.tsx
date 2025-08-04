"use client"

import { Button } from "@/components/ui/button"

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

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className={`whitespace-nowrap gap-2 ${
            selectedCategory === category.id
              ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              : "bg-white/70 backdrop-blur-sm border-white/20 hover:bg-white/90"
          }`}
        >
          <span>{category.icon}</span>
          {category.label}
        </Button>
      ))}
    </div>
  )
}
