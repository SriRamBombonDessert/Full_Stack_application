"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: "waffles" | "ice-cream" | "brownies" | "drinks" | "coffee" | "food" | "specials"
  image: string
  isAvailable: boolean
  isSpecial: boolean
  tags: string[]
}

interface MenuContextType {
  menuItems: MenuItem[]
  loading: boolean
  addMenuItem: (item: Omit<MenuItem, "id">) => void
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void
  deleteMenuItem: (id: string) => void
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)

const initialMenuItems: MenuItem[] = [
  // Waffles
  {
    id: "1",
    name: "Hazelnut Waffle",
    description: "Crispy waffle topped with rich hazelnut spread and crunchy nuts",
    price: 109,
    category: "waffles",
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
    isAvailable: true,
    isSpecial: false,
    tags: ["oreo", "chocolate", "cookies"],
  },
  {
    id: "4",
    name: "Cookies and Cream Waffle",
    description: "Vanilla waffle with cookies and cream filling",
    price: 89,
    category: "waffles",
    image: "/placeholder.svg?height=300&width=300",
    isAvailable: true,
    isSpecial: false,
    tags: ["cookies", "cream", "vanilla"],
  },
  {
    id: "5",
    name: "Nutella Waffle",
    description: "Classic waffle generously spread with Nutella",
    price: 99,
    category: "waffles",
    image: "/placeholder.svg?height=300&width=300",
    isAvailable: true,
    isSpecial: true,
    tags: ["nutella", "chocolate", "popular"],
  },

  // Ice Cream
  {
    id: "6",
    name: "Vanilla Ice Cream",
    description: "Classic vanilla ice cream made with real vanilla beans",
    price: 109,
    category: "ice-cream",
    image: "/placeholder.svg?height=300&width=300",
    isAvailable: true,
    isSpecial: false,
    tags: ["vanilla", "classic", "creamy"],
  },
  {
    id: "7",
    name: "Chocolate Ice Cream",
    description: "Rich and creamy chocolate ice cream",
    price: 99,
    category: "ice-cream",
    image: "/placeholder.svg?height=300&width=300",
    isAvailable: true,
    isSpecial: false,
    tags: ["chocolate", "rich", "creamy"],
  },
  {
    id: "8",
    name: "Butterscotch Ice Cream",
    description: "Smooth butterscotch flavored ice cream with caramel swirls",
    price: 99,
    category: "ice-cream",
    image: "/placeholder.svg?height=300&width=300",
    isAvailable: true,
    isSpecial: false,
    tags: ["butterscotch", "caramel", "smooth"],
  },

  // Brownies
  {
    id: "9",
    name: "Brownie with Double Chocolate",
    description: "Fudgy brownie topped with double chocolate sauce",
    price: 89,
    category: "brownies",
    image: "/placeholder.svg?height=300&width=300",
    isAvailable: true,
    isSpecial: false,
    tags: ["brownie", "chocolate", "fudgy"],
  },
  {
    id: "10",
    name: "Brownie with Nutella",
    description: "Warm brownie served with creamy Nutella",
    price: 99,
    category: "brownies",
    image: "/placeholder.svg?height=300&width=300",
    isAvailable: true,
    isSpecial: true,
    tags: ["brownie", "nutella", "warm"],
  },

  // Drinks
  {
    id: "11",
    name: "Chocolate Oreo Milkshake",
    description: "Thick milkshake blended with chocolate and Oreo cookies",
    price: 119,
    category: "drinks",
    image: "/placeholder.svg?height=300&width=300",
    isAvailable: true,
    isSpecial: false,
    tags: ["milkshake", "oreo", "chocolate"],
  },
  {
    id: "12",
    name: "Alphonso Mango Milkshake",
    description: "Fresh Alphonso mango blended into a creamy milkshake",
    price: 79,
    category: "drinks",
    image: "/placeholder.svg?height=300&width=300",
    isAvailable: true,
    isSpecial: true,
    tags: ["mango", "fresh", "seasonal"],
  },
  {
    id: "13",
    name: "Blue Curacao Mojito",
    description: "Refreshing mojito with blue curacao and mint",
    price: 69,
    category: "drinks",
    image: "/placeholder.svg?height=300&width=300",
    isAvailable: true,
    isSpecial: false,
    tags: ["mojito", "refreshing", "mint"],
  },

  // Coffee
  {
    id: "14",
    name: "Espresso",
    description: "Strong coffee made by forcing hot water through finely-ground coffee beans",
    price: 30,
    category: "coffee",
    image: "/placeholder.svg?height=300&width=300",
    isAvailable: true,
    isSpecial: false,
    tags: ["espresso", "strong", "classic"],
  },
  {
    id: "15",
    name: "Cappuccino",
    description: "Balanced drink with equal parts espresso, steamed milk, and frothy foam",
    price: 40,
    category: "coffee",
    image: "/placeholder.svg?height=300&width=300",
    isAvailable: true,
    isSpecial: false,
    tags: ["cappuccino", "foam", "balanced"],
  },
  {
    id: "16",
    name: "Latte",
    description: "Espresso mixed with steamed milk and light layer of foam",
    price: 50,
    category: "coffee",
    image: "/placeholder.svg?height=300&width=300",
    isAvailable: true,
    isSpecial: false,
    tags: ["latte", "milk", "smooth"],
  },

  // Food
  {
    id: "17",
    name: "Chicken Momos",
    description: "Steamed dumplings filled with seasoned chicken",
    price: 119,
    category: "food",
    image: "/placeholder.svg?height=300&width=300",
    isAvailable: true,
    isSpecial: false,
    tags: ["momos", "chicken", "steamed"],
  },
  {
    id: "18",
    name: "Cheese Seasoning Fries",
    description: "Crispy fries topped with cheese and special seasoning",
    price: 109,
    category: "food",
    image: "/placeholder.svg?height=300&width=300",
    isAvailable: true,
    isSpecial: false,
    tags: ["fries", "cheese", "crispy"],
  },

  // Specials
  {
    id: "19",
    name: "Tiramisu",
    description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
    price: 159,
    category: "specials",
    image: "/placeholder.svg?height=300&width=300",
    isAvailable: true,
    isSpecial: true,
    tags: ["tiramisu", "italian", "coffee"],
  },
  {
    id: "20",
    name: "Tres Leches",
    description: "Sponge cake soaked in three kinds of milk with whipped cream",
    price: 149,
    category: "specials",
    image: "/placeholder.svg?height=300&width=300",
    isAvailable: true,
    isSpecial: true,
    tags: ["cake", "milk", "creamy"],
  },
]

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
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

  const saveToStorage = (items: MenuItem[]) => {
    localStorage.setItem("bombon-menu-items", JSON.stringify(items))
  }

  const addMenuItem = (item: Omit<MenuItem, "id">) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
    }
    const updatedItems = [...menuItems, newItem]
    setMenuItems(updatedItems)
    saveToStorage(updatedItems)
  }

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    const updatedItems = menuItems.map((item) => (item.id === id ? { ...item, ...updates } : item))
    setMenuItems(updatedItems)
    saveToStorage(updatedItems)
  }

  const deleteMenuItem = (id: string) => {
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
