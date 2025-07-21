const { Product, User } = require('@prisma/client');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findMany({
      where: { userId: req.user.id },
      include: { user: { select: { name: true, email: true } } }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const product = await Product.create({
      data: {
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        userId: req.user.id
      }
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const { id } = req.params;
    const updated = await Product.update({
      where: { id: parseInt(id), userId: req.user.id },
      data: {
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price)
      }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.delete({
      where: { id: parseInt(id), userId: req.user.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };