import { useEffect, useState } from "react"
import axios from "axios"
import Hero from "@/components/Hero"
import ProductCard from "@/components/ProductCard"
import AddProductModal from "@/components/AddProductModal"

const API_URL = import.meta.env.VITE_API_URL

const Home = () => {
  const [activeTab, setActiveTab] = useState("published")
  const [products, setProducts] = useState([])
  const [openModal, setOpenModal] = useState(false)
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

  const handleTogglePublish = async (id) => {
    try {
      await axios.patch(`${API_URL}/product/${id}/publish`)
      fetchProducts()
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/product/${id}`)
      fetchProducts()
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = (product) => {
    setEditProduct(product)
    setOpenModal(true)
  }

  const filteredProducts = products.filter((product) =>
    activeTab === "published"
      ? product.isPublished
      : !product.isPublished
  )

  return (
    <div className="bg-gray-50 min-h-screen px-4 sm:px-6 lg:px-10 py-6">

      <Hero activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* FIXED RESPONSIVE GRID */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 mt-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={handleDelete}
              onTogglePublish={handleTogglePublish}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <div className="col-span-full flex justify-center py-16">
            <p className="text-gray-400 text-sm sm:text-base">
              No products found.
            </p>
          </div>
        )}
      </div>

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

export default Home
