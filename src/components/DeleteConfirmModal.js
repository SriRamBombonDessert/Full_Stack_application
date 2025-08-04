"use client"
import { useMenu } from "../contexts/MenuContext"

function DeleteConfirmModal({ isOpen, onClose, item }) {
  const { deleteMenuItem } = useMenu()

  const handleDelete = () => {
    deleteMenuItem(item.id)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Menu Item</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete "{item.name}"? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal
