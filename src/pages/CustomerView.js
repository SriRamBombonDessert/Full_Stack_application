"use client"

import { useState, useEffect } from "react"
import { Link } from "next/link"
import { ArrowLeft, Search, Filter } from "lucide-react"
import { useMenu } from "../contexts/MenuContext"
import MenuCard from "../components/MenuCard"
import CategoryFilter from "../components/CategoryFilter"
import LoadingSpinner from "../components/LoadingSpinner"

function CustomerView() {
  const { menuItems, loading } = useMenu()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredItems, setFilteredItems] = useState([])

  useEffect(() => {
    let filtered = menuItems

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredItems(filtered)
  }, [menuItems, searchTerm, selectedCategory])

  if (loading) {
    return <LoadingSpinner message="Loading delicious menu..." />
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                BOMBÓN DESSERT
              </h1>
              <p className="text-sm text-gray-600">Customer Menu</p>
            </div>
            <div className="w-24"></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/70 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600">
                  Showing {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""}
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
                <MenuCard key={item.id} item={item} isAdmin={false} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CustomerView
