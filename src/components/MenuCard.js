"use client"

import { useState } from "react"
import { Edit, Trash2, Star, Tag } from "lucide-react"
import AddEditModal from "./AddEditModal"
import DeleteConfirmModal from "./DeleteConfirmModal"

function MenuCard({ item, isAdmin }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  return (
    <>
      <div className="group hover:scale-105 transition-all duration-300 bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl overflow-hidden rounded-lg">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {item.isSpecial && (
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs">
              <Star className="w-3 h-3" />
              Special
            </div>
          )}

          {!item.isAvailable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{item.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs capitalize">
                {item.category.replace("-", " ")}
              </span>
              {item.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                >
                  <Tag className="w-2 h-2" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 pt-0 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">₹{item.price}</span>
            {item.originalPrice && item.originalPrice > item.price && (
              <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
            )}
          </div>

          {isAdmin && (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <AddEditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} editItem={item} />

      <DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} item={item} />
    </>
  )
}

export default MenuCard
