const { User, Product } = require("@prisma/client");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findMany({
      include: { products: true }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.deleteMany({ where: { userId: parseInt(id) } });
    await User.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllUsers, deleteUser };