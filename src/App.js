"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import CustomerView from "./components/CustomerView"
import AdminView from "./components/AdminView"
import "./App.css"

function App() {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const response = await fetch("https://full-stack-application-slar.onrender.com/menuItems")
      const data = await response.json()
      setMenuItems(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching menu items:", error)
      setLoading(false)
    }
  }

  const addMenuItem = async (newItem) => {
    try {
      const response = await fetch("https://full-stack-application-slar.onrender.com/menuItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      })
      const addedItem = await response.json()
      setMenuItems([...menuItems, addedItem])
      return addedItem
    } catch (error) {
      console.error("Error adding menu item:", error)
    }
  }

  const updateMenuItem = async (id, updatedItem) => {
    try {
      const response = await fetch(`https://full-stack-application-slar.onrender.com/menuItems/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      })
      const updated = await response.json()
      setMenuItems(menuItems.map((item) => (item.id === id ? updated : item)))
      return updated
    } catch (error) {
      console.error("Error updating menu item:", error)
    }
  }

  const deleteMenuItem = async (id) => {
    try {
      await fetch(`https://full-stack-application-slar.onrender.com/menuItems/${id}`, {
        method: "DELETE",
      })
      setMenuItems(menuItems.filter((item) => item.id !== id))
    } catch (error) {
      console.error("Error deleting menu item:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/customer" replace />} />
          <Route path="/customer" element={<CustomerView menuItems={menuItems} />} />
          <Route
            path="/admin"
            element={
              <AdminView
                menuItems={menuItems}
                onAdd={addMenuItem}
                onUpdate={updateMenuItem}
                onDelete={deleteMenuItem}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
