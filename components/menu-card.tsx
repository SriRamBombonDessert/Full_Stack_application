"use client"

import { useState } from "react"
import Image from "next/image"
import { Edit, Trash2, Star, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type MenuItem, useMenu } from "@/contexts/menu-context"
import { AddEditMenuModal } from "./add-edit-menu-modal"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface MenuCardProps {
  item: MenuItem
  isAdmin: boolean
}

export function MenuCard({ item, isAdmin }: MenuCardProps) {
  const { deleteMenuItem } = useMenu()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleDelete = () => {
    deleteMenuItem(item.id)
  }

  return (
    <>
      <Card className="group hover:scale-105 transition-all duration-300 bg-white/70 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl overflow-hidden">
        <CardHeader className="p-0 relative">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

            {item.isSpecial && (
              <Badge className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                <Star className="w-3 h-3 mr-1" />
                Special
              </Badge>
            )}

            {!item.isAvailable && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="destructive" className="text-sm">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{item.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs capitalize">
                {item.category.replace("-", " ")}
              </Badge>
              {item.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  <Tag className="w-2 h-2 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">₹{item.price}</span>
            {item.originalPrice && item.originalPrice > item.price && (
              <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
            )}
          </div>

          {isAdmin && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditModalOpen(true)}
                className="hover:bg-blue-50 hover:border-blue-300"
              >
                <Edit className="w-4 h-4" />
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="hover:bg-red-50 hover:border-red-300 text-red-600 bg-transparent"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Menu Item</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{item.name}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </CardFooter>
      </Card>

      <AddEditMenuModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} editItem={item} />
    </>
  )
}
