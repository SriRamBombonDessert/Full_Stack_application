"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type MenuItem, useMenu } from "@/contexts/menu-context"

interface AddEditMenuModalProps {
  isOpen: boolean
  onClose: () => void
  editItem?: MenuItem
}

const categories = [
  { value: "waffles", label: "Waffles" },
  { value: "ice-cream", label: "Ice Cream" },
  { value: "brownies", label: "Brownies" },
  { value: "drinks", label: "Drinks" },
  { value: "coffee", label: "Coffee" },
  { value: "food", label: "Food" },
  { value: "specials", label: "Specials" },
]

export function AddEditMenuModal({ isOpen, onClose, editItem }: AddEditMenuModalProps) {
  const { addMenuItem, updateMenuItem } = useMenu()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "waffles" as MenuItem["category"],
    image: "",
    isAvailable: true,
    isSpecial: false,
    tags: [] as string[],
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const menuItem = {
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      originalPrice: formData.originalPrice ? Number.parseFloat(formData.originalPrice) : undefined,
      category: formData.category,
      image: formData.image || `/placeholder.svg?height=300&width=300&query=${encodeURIComponent(formData.name)}`,
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

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {editItem ? "Edit Menu Item" : "Add New Menu Item"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter item name"
                required
                className="bg-white/70 backdrop-blur-sm border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value as MenuItem["category"] }))}
              >
                <SelectTrigger className="bg-white/70 backdrop-blur-sm border-white/20">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Enter item description"
              required
              className="bg-white/70 backdrop-blur-sm border-white/20"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                placeholder="0.00"
                required
                className="bg-white/70 backdrop-blur-sm border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price (₹)</Label>
              <Input
                id="originalPrice"
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={(e) => setFormData((prev) => ({ ...prev, originalPrice: e.target.value }))}
                placeholder="0.00 (optional)"
                className="bg-white/70 backdrop-blur-sm border-white/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
              placeholder="Enter image URL (optional)"
              className="bg-white/70 backdrop-blur-sm border-white/20"
            />
            <p className="text-xs text-gray-500">Leave empty to auto-generate placeholder image</p>
          </div>

          <div className="space-y-4">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                className="bg-white/70 backdrop-blur-sm border-white/20"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => removeTag(tag)} />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="available"
                  checked={formData.isAvailable}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isAvailable: checked }))}
                />
                <Label htmlFor="available">Available</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="special"
                  checked={formData.isSpecial}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isSpecial: checked }))}
                />
                <Label htmlFor="special" className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Special Item
                </Label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {editItem ? "Update Item" : "Add Item"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
