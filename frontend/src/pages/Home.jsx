import { useEffect, useState } from "react"
import axios from "axios"
import Hero from "@/components/Hero"
import ProductCard from "@/components/ProductCard"
import AddProductModal from "@/components/AddProductModal"

const Home = () => {
  const [activeTab, setActiveTab] = useState("published")
  const [products, setProducts] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [editProduct, setEditProduct] = useState(null)

  // ✅ FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/product")
      setProducts(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // ✅ TOGGLE PUBLISH
  const handleTogglePublish = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/product/${id}/publish`)
      fetchProducts()
    } catch (error) {
      console.error(error)
    }
  }

  // ✅ DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/product/${id}`)
      fetchProducts()
    } catch (error) {
      console.error(error)
    }
  }

  // ✅ EDIT
  const handleEdit = (product) => {
    setEditProduct(product)
    setOpenModal(true)
  }

  // ✅ FILTER BASED ON TAB
  const filteredProducts = products.filter((product) =>
    activeTab === "published"
      ? product.isPublished
      : !product.isPublished
  )

  return (
    <div className="bg-gray-50 min-h-screen p-6">

      <Hero activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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
          <p className="text-gray-400 text-sm">
            No products found.
          </p>
        )}
      </div>

      {/* ✅ SAME MODAL AS PRODUCTS PAGE */}
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
