import Product from "../models/productModel.js"

import cloudinary from "../config/cloudinary.js"

export const createProduct = async (req, res) => {
  console.log("BODY:", req.body)
console.log("FILE:", req.file)

  try {
    const { name, type, quantity, mrp, sellingPrice, brand, exchange } = req.body

    let imageUrl = ""

    if (req.file) {
      const result = await cloudinary.uploader.upload(
  req.file.path.replace(/\\/g, "/"),   // 👈 FIX
  {
    folder: "products",
  }
)

      imageUrl = result.secure_url
    }

    const product = await Product.create({
      name,
      type,
      quantity,
      mrp,
      sellingPrice,
      brand,
      exchange,
      image: imageUrl,
      isPublished: false,
    })

    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 })
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: "Product deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateProduct = async (req, res) => {
  try {
    let updateData = { ...req.body }

    // ✅ If new image uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(
        req.file.path.replace(/\\/g, "/"), // Windows fix
        {
          folder: "products",
        }
      )

      updateData.image = result.secure_url
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.status(200).json(updatedProduct)

  } catch (error) {
    console.log("UPDATE ERROR:", error)
    res.status(500).json({ message: error.message })
  }
}


export const togglePublish = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    product.isPublished = !product.isPublished
    await product.save()

    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

