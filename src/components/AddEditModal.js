"use client"

import { useState, useEffect } from "react"
import { X, Star } from "lucide-react"
import { useMenu } from "../contexts/MenuContext"

const categories = [
  { value: "waffles", label: "Waffles" },
  { value: "ice-cream", label: "Ice Cream" },
  { value: "brownies", label: "Brownies" },
  { value: "drinks", label: "Drinks" },
  { value: "coffee", label: "Coffee" },
  { value: "food", label: "Food" },
  { value: "specials", label: "Specials" },
]

function AddEditModal({ isOpen, onClose, editItem }) {
  const { addMenuItem, updateMenuItem } = useMenu()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "waffles",
    image: "",
    isAvailable: true,
    isSpecial: false,
    tags: [],
  })
  const [newTag, setNewTag] = useState("")

  useEffect(() => {
    if (editItem) {
      setFormData({
        name: editItem.name,
        description: editItem.description,
        price: editItem.price.toString(),
        originalPrice: editItem.originalPrice?.toString() || "",
        category: editItem.category,
        image: editItem.image,
        isAvailable: editItem.isAvailable,
        isSpecial: editItem.isSpecial,
        tags: editItem.tags,
      })
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        originalPrice: "",
        category: "waffles",
        image: "",
        isAvailable: true,
        isSpecial: false,
        tags: [],
      })
    }
  }, [editItem, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()

    const menuItem = {
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      originalPrice: formData.originalPrice ? Number.parseFloat(formData.originalPrice) : undefined,
      category: formData.category,
      image: formData.image || `https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=300&fit=crop`,
      isAvailable: formData.isAvailable,
      isSpecial: formData.isSpecial,
      tags: formData.tags,
    }

    if (editItem) {
      updateMenuItem(editItem.id, menuItem)
    } else {
      addMenuItem(menuItem)
    }

    onClose()
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {editItem ? "Edit Menu Item" : "Add New Menu Item"}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter item name"
                  required
                  className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Enter item description"
                required
                rows={3}
                className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                  placeholder="0.00"
                  required
                  className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData((prev) => ({ ...prev, originalPrice: e.target.value }))}
                  placeholder="0.00 (optional)"
                  className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                placeholder="Enter image URL (optional)"
                className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty to use default image</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  className="flex-1 px-3 py-2 bg-white/70 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                    <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => removeTag(tag)} />
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
              <div className="space-y-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData((prev) => ({ ...prev, isAvailable: e.target.checked }))}
                    className="rounded"
                  />
                  <span>Available</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isSpecial}
                    onChange={(e) => setFormData((prev) => ({ ...prev, isSpecial: e.target.checked }))}
                    className="rounded"
                  />
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Special Item
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300"
              >
                {editItem ? "Update Item" : "Add Item"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddEditModal
