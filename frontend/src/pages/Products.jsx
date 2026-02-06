import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import AddProductModal from "../components/AddProductModal"
import ProductCard from "../components/ProductCard"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const Products = () => {
  const [openModal, setOpenModal] = useState(false)
  const [products, setProducts] = useState([])
  const [editProduct, setEditProduct] = useState(null)

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/product`)
      setProducts(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/product/${id}`)
    fetchProducts()
  }

  const handleEdit = (product) => {
    setEditProduct(product)
    setOpenModal(true)
  }

  const handleTogglePublish = async (id) => {
    try {
      await axios.patch(`${API_URL}/product/${id}/publish`)
      fetchProducts()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm min-h-[500px]">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-4 sm:px-6 py-4 border-b">
        <h2 className="text-sm sm:text-base font-medium text-gray-700">
          Products
        </h2>

        <Button
          onClick={() => {
            setEditProduct(null)
            setOpenModal(true)
          }}
          className="bg-[#173A8A] text-white w-full sm:w-auto"
        >
          Add Products
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="flex justify-center py-16 sm:py-24 text-gray-500 text-sm sm:text-base">
          No products found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 p-4 sm:p-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onTogglePublish={handleTogglePublish}
            />
          ))}
        </div>
      )}

      <AddProductModal
        open={openModal}
        onClose={() => {
          setOpenModal(false)
          setEditProduct(null)
        }}
        onSuccess={fetchProducts}
        editData={editProduct}
      />
    </div>
  )
}

export default Products
