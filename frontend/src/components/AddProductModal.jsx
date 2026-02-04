import React, { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL

const AddProductModal = ({ open, onClose, editData , onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    quantity: "",
    mrp: "",
    sellingPrice: "",
    brand: "",
    exchange: "Yes"
  })

  
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || "",
        type: editData.type || "",
        quantity: editData.quantity || "",
        mrp: editData.mrp || "",
        sellingPrice: editData.sellingPrice || "",
        brand: editData.brand || "",
        exchange: editData.exchange || "Yes"
      })
    } else {
      setFormData({
        name: "",
        type: "",
        quantity: "",
        mrp: "",
        sellingPrice: "",
        brand: "",
        exchange: "Yes"
      })
      setImageFile(null)
    }
  }, [editData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.sellingPrice) return

    try {
      const data = new FormData()

      
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key])
      })

      
      if (imageFile) {
        data.append("image", imageFile)
      }

      if (editData) {
        await axios.put(
          `${API_URL}/${editData._id}`,
          data
        )
      } else {
        await axios.post(
          `${API_URL}/product`,
          data
        )
      }

      onSuccess()
      onClose()

    } catch (error) {
      console.error(error)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            {editData ? "Edit Product" : "Add Product"}
          </h2>
          <X
            size={18}
            onClick={onClose}
            className="cursor-pointer text-gray-500 hover:text-black"
          />
        </div>

        {/* BODY */}
        <div className="px-6 py-5 space-y-5 overflow-y-auto">

          <div>
            <label className="text-sm font-medium block mb-2">
              Product Name
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">
              Product Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md h-9 px-3 text-sm focus:ring-2 focus:ring-[#173A8A] outline-none"
            >
              <option value="">Select product type</option>
              <option>Food</option>
              <option>Electronics</option>
              <option>Clothing</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">
              Quantity Stock
            </label>
            <Input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Total numbers of stock available"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">
              MRP
            </label>
            <Input
              type="number"
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
              placeholder="Enter MRP"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">
              Selling Price
            </label>
            <Input
              type="number"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
              placeholder="Enter selling price"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">
              Brand Name
            </label>
            <Input
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Enter brand name"
            />
          </div>


          <div>
            <label className="text-sm font-medium block mb-2">
              Upload Product Images
            </label>

            <label className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition">
              <span className="text-sm text-gray-400">
                Enter Description
              </span>
              <span className="text-[#173A8A] font-medium text-sm mt-1">
                Browse
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </label>

            {imageFile && (
              <p className="text-xs text-green-600 mt-2">
                Selected: {imageFile.name}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">
              Exchange or return eligibility
            </label>
            <select
              name="exchange"
              value={formData.exchange}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md h-9 px-3 text-sm focus:ring-2 focus:ring-[#173A8A] outline-none"
            >
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

        </div>

        
        <div className="flex justify-end px-6 py-4 border-t bg-gray-50">
          <Button
            onClick={handleSubmit}
            className="bg-[#173A8A] hover:bg-[#122E6B] text-white px-6"
          >
            {editData ? "Update" : "Create"}
          </Button>
        </div>

      </div>
    </div>
  )
}

export default AddProductModal
