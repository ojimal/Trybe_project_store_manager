const connection = require('../db/connection');

const findAllProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return result;
};

const findProductById = async (productId) => {
  const [[result]] = await connection.execute('SELECT * FROM products WHERE id = ?',
    [productId]);
  return result;
};

module.exports = {
  findAllProducts,
  findProductById,
};