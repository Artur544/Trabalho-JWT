const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const productController = require("../controllers/productController");

// Todas as rotas exigem autenticação JWT de usuário comum
router.use(authMiddleware(["USER"]));

// GET /products - Listar produtos do usuário
router.get("/", productController.getAllProducts);

// POST /products - Criar novo produto
router.post("/", productController.createProduct);

// PUT /products/:id - Atualizar produto
router.put("/:id", productController.updateProduct);

// DELETE /products/:id - Remover produto
router.delete("/:id", productController.deleteProduct);

module.exports = router;
