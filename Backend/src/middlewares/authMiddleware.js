const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        throw new Error("Token não fornecido");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      if (roles.length && !roles.includes(user.role)) {
        throw new Error("Acesso não autorizado");
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };
};

module.exports = authMiddleware;
