"use client"

import { useState } from "react"
import { Link } from "next/link"
import { ArrowLeft, Plus, Search, Filter } from "lucide-react"
import { useMenu } from "../contexts/MenuContext"
import MenuCard from "../components/MenuCard"
import CategoryFilter from "../components/CategoryFilter"
import AddEditModal from "../components/AddEditModal"
import LoadingSpinner from "../components/LoadingSpinner"

function AdminView() {
  const { menuItems, loading } = useMenu()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return <LoadingSpinner message="Loading admin panel..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                BOMBÓN DESSERT
              </h1>
              <p className="text-sm text-gray-600">Admin Panel</p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/70 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600">
              Managing {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""}
            </span>
          </div>
          {selectedCategory !== "all" && (
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm capitalize">
              {selectedCategory.replace("-", " ")}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} isAdmin={true} />
          ))}
        </div>
      </div>

      <AddEditModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}

export default AdminView
