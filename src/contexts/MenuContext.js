"use client"

import { createContext, useContext, useState, useEffect } from "react"

const MenuContext = createContext()

const initialMenuItems = [
  // Waffles
  {
    id: "1",
    name: "Hazelnut Waffle",
    description: "Crispy waffle topped with rich hazelnut spread and crunchy nuts",
    price: 109,
    category: "waffles",
    image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=300&h=300&fit=crop",
    isAvailable: true,
    isSpecial: false,
    tags: ["nuts", "sweet", "crispy"],
  },
  {
    id: "2",
    name: "Butterscotch Crunch Waffle",
    description: "Golden waffle with butterscotch sauce and crunchy toppings",
    price: 84,
    category: "waffles",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop",
    isAvailable: true,
    isSpecial: false,
    tags: ["butterscotch", "crunchy", "sweet"],
  },
  {
    id: "3",
    name: "Oreo Waffle",
    description: "Chocolate waffle loaded with crushed Oreo cookies and cream",
    price: 84,
    category: "waffles",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=300&fit=crop",
    isAvailable: true,
    isSpecial: false,
    tags: ["oreo", "chocolate", "cookies"],
  },
  {
    id: "4",
    name: "Nutella Waffle",
    description: "Classic waffle generously spread with Nutella",
    price: 99,
    category: "waffles",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop",
    isAvailable: true,
    isSpecial: true,
    tags: ["nutella", "chocolate", "popular"],
  },

  // Ice Cream
  {
    id: "5",
    name: "Vanilla Ice Cream",
    description: "Classic vanilla ice cream made with real vanilla beans",
    price: 109,
    category: "ice-cream",
    image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=300&h=300&fit=crop",
    isAvailable: true,
    isSpecial: false,
    tags: ["vanilla", "classic", "creamy"],
  },
  {
    id: "6",
    name: "Chocolate Ice Cream",
    description: "Rich and creamy chocolate ice cream",
    price: 99,
    category: "ice-cream",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=300&fit=crop",
    isAvailable: true,
    isSpecial: false,
    tags: ["chocolate", "rich", "creamy"],
  },
  {
    id: "7",
    name: "Butterscotch Ice Cream",
    description: "Smooth butterscotch flavored ice cream with caramel swirls",
    price: 99,
    category: "ice-cream",
    image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=300&h=300&fit=crop",
    isAvailable: true,
    isSpecial: false,
    tags: ["butterscotch", "caramel", "smooth"],
  },

  // Brownies
  {
    id: "8",
    name: "Double Chocolate Brownie",
    description: "Fudgy brownie topped with double chocolate sauce",
    price: 89,
    category: "brownies",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=300&fit=crop",
    isAvailable: true,
    isSpecial: false,
    tags: ["brownie", "chocolate", "fudgy"],
  },
  {
    id: "9",
    name: "Nutella Brownie",
    description: "Warm brownie served with creamy Nutella",
    price: 99,
    category: "brownies",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=300&h=300&fit=crop",
    isAvailable: true,
    isSpecial: true,
    tags: ["brownie", "nutella", "warm"],
  },

  // Drinks
  {
    id: "10",
    name: "Chocolate Oreo Milkshake",
    description: "Thick milkshake blended with chocolate and Oreo cookies",
    price: 119,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=300&fit=crop",
    isAvailable: true,
    isSpecial: false,
    tags: ["milkshake", "oreo", "chocolate"],
  },
  {
    id: "11",
    name: "Mango Milkshake",
    description: "Fresh Alphonso mango blended into a creamy milkshake",
    price: 79,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=300&h=300&fit=crop",
    isAvailable: true,
    isSpecial: true,
    tags: ["mango", "fresh", "seasonal"],
  },
  {
    id: "12",
    name: "Blue Curacao Mojito",
    description: "Refreshing mojito with blue curacao and mint",
    price: 69,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=300&fit=crop",
    isAvailable: true,
    isSpecial: false,
    tags: ["mojito", "refreshing", "mint"],
  },

  // Coffee
  {
    id: "13",
    name: "Espresso",
    description: "Strong coffee made by forcing hot water through finely-ground coffee beans",
    price: 30,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=300&h=300&fit=crop",
    isAvailable: true,
    isSpecial: false,
    tags: ["espresso", "strong", "classic"],
  },
  {
    id: "14",
    name: "Cappuccino",
    description: "Balanced drink with equal parts espresso, steamed milk, and frothy foam",
    price: 40,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=300&fit=crop",
    isAvailable: true,
    isSpecial: false,
    tags: ["cappuccino", "foam", "balanced"],
  },
  {
    id: "15",
    name: "Latte",
    description: "Espresso mixed with steamed milk and light layer of foam",
    price: 50,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop",
    isAvailable: true,
    isSpecial: false,
    tags: ["latte", "milk", "smooth"],
  },

  // Food
  {
    id: "16",
    name: "Chicken Momos",
    description: "Steamed dumplings filled with seasoned chicken",
    price: 119,
    category: "food",
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=300&h=300&fit=crop",
    isAvailable: true,
    isSpecial: false,
    tags: ["momos", "chicken", "steamed"],
  },
  {
    id: "17",
    name: "Cheese Seasoning Fries",
    description: "Crispy fries topped with cheese and special seasoning",
    price: 109,
    category: "food",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=300&fit=crop",
    isAvailable: true,
    isSpecial: false,
    tags: ["fries", "cheese", "crispy"],
  },

  // Specials
  {
    id: "18",
    name: "Tiramisu",
    description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
    price: 159,
    category: "specials",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=300&fit=crop",
    isAvailable: true,
    isSpecial: true,
    tags: ["tiramisu", "italian", "coffee"],
  },
  {
    id: "19",
    name: "Tres Leches",
    description: "Sponge cake soaked in three kinds of milk with whipped cream",
    price: 149,
    category: "specials",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop",
    isAvailable: true,
    isSpecial: true,
    tags: ["cake", "milk", "creamy"],
  },
]

export function MenuProvider({ children }) {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load from localStorage or use initial data
    const savedItems = localStorage.getItem("bombon-menu-items")
    if (savedItems) {
      setMenuItems(JSON.parse(savedItems))
    } else {
      setMenuItems(initialMenuItems)
      localStorage.setItem("bombon-menu-items", JSON.stringify(initialMenuItems))
    }
    setLoading(false)
  }, [])

  const saveToStorage = (items) => {
    localStorage.setItem("bombon-menu-items", JSON.stringify(items))
  }

  const addMenuItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
    }
    const updatedItems = [...menuItems, newItem]
    setMenuItems(updatedItems)
    saveToStorage(updatedItems)
  }

  const updateMenuItem = (id, updates) => {
    const updatedItems = menuItems.map((item) => (item.id === id ? { ...item, ...updates } : item))
    setMenuItems(updatedItems)
    saveToStorage(updatedItems)
  }

  const deleteMenuItem = (id) => {
    const updatedItems = menuItems.filter((item) => item.id !== id)
    setMenuItems(updatedItems)
    saveToStorage(updatedItems)
  }

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        loading,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export function useMenu() {
  const context = useContext(MenuContext)
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider")
  }
  return context
}
