const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllProducts = async (req, res) => {
  try {
    const { name } = req.query;
    const products = await prisma.product.findMany({
      where: name
        ? { name: { contains: name }, userId: req.user.id }
        : { userId: req.user.id },
      include: { user: { select: { name: true, email: true } } },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  console.log("Produto criado", req.body);
  try {
    const { name, quantity, price } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        userId: req.user.id,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const { id } = req.params;
    const updated = await prisma.product.update({
      where: { id: parseInt(id), userId: req.user.id },
      data: {
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
      },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id: parseInt(id), userId: req.user.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
