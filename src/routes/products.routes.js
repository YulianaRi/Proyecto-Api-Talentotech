import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct,
  deleteProduct 
} from "../controllers/products.controller.js";

const router = Router();


router.get("/", getProducts);
router.get("/:id", getProductById);

router.put("/:id", authenticate, updateProduct);
router.delete("/:id", authenticate, deleteProduct);
router.post("/create", authenticate, createProduct); // Ruta protegida para crear productos

export default router;