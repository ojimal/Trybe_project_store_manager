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

// reference trybe car msc passanger.model
const addProduct = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [product],
  );
  return insertId;
};

module.exports = {
  findAllProducts,
  findProductById,
  addProduct,
};