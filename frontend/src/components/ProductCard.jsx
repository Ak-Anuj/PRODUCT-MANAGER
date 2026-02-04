import React from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

const ProductCard = ({
  product,
  onDelete,
  onTogglePublish,
  onEdit
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 hover:shadow-lg transition duration-300">

      {/* IMAGE */}
      <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-center mb-4">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-32 sm:h-36 md:h-40 object-contain"
          />
        ) : (
          <div className="h-32 flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>

      {/* TITLE */}
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        {product.name}
      </h3>

      {/* DETAILS */}
      <div className="space-y-1 text-xs">

        <div className="flex justify-between">
          <span className="text-gray-400">Product type</span>
          <span className="text-gray-700">{product.type}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Quantity Stock</span>
          <span className="text-gray-700">{product.quantity}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">MRP</span>
          <span className="text-gray-700">₹ {product.mrp}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Selling Price</span>
          <span className="text-gray-900 font-medium">
            ₹ {product.sellingPrice}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Brand Name</span>
          <span className="text-gray-700">{product.brand}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Exchange Eligibility</span>
          <span className="text-gray-700">{product.exchange}</span>
        </div>

      </div>

      {/* BUTTONS */}
      <div className="flex items-center gap-2 mt-4">

        <Button
          onClick={() => onTogglePublish(product._id)}
          className={`text-xs px-4 py-2 rounded-lg ${
            product.isPublished
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {product.isPublished ? "Unpublish" : "Publish"}
        </Button>

        <Button
          variant="outline"
          className="text-xs px-4 py-2 rounded-lg"
          onClick={() => onEdit(product)}
        >
          Edit
        </Button>

        <Button
          variant="outline"
          className="p-2 rounded-lg"
          onClick={() => onDelete(product._id)}
        >
          <Trash2 size={14} />
        </Button>

      </div>
    </div>
  )
}

export default ProductCard
