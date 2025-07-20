import { Router } from "express";

const router = Router();

import { getAllProducts, searchProduct, getProductById, createProduct, deleteProduct } from "../controllers/products.controller.js";
import { authentication } from "../middlewares/auth.middleware.js";

router.get("/products", authentication, getAllProducts);
router.get("/products/search", authentication, searchProduct);
router.get("/products/:id", authentication, getProductById);
router.post("/products", authentication, createProduct);

router.put("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  const { name, price } = req.body;
  products[productIndex] = { id: productId, name, price };
  res.json(products[productIndex]);
});

router.delete("/products/:id", deleteProduct);

export default router;
