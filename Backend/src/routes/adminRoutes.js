const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminController = require("../controllers/adminController");

// Todas as rotas exigem autenticação JWT de admin
router.use(authMiddleware(["ADMIN"]));

// GET /admin/users - Listar todos os usuários com seus produtos
router.get("/users", adminController.getAllUsers);

// DELETE /admin/users/:id - Remover usuário
router.delete("/users/:id", adminController.deleteUser);

module.exports = router;
