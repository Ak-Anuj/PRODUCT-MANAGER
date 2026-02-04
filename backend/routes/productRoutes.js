import express from "express"
import multer from "multer"
import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  togglePublish
} from "../controllers/productController.js"

const router = express.Router()

const upload = multer({ dest: "uploads/" })

router.post("/", upload.single("image"), createProduct)
router.put("/:id", upload.single("image"), updateProduct) // ✅ FIXED
router.get("/", getProducts)
router.delete("/:id", deleteProduct)
router.patch("/:id/publish", togglePublish)

export default router
