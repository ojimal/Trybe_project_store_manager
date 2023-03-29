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

const updateProduct = async (id, name) => {
  const [result] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );
  return result;
};

const deleteProduct = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
  return result;
};

module.exports = {
  findAllProducts,
  findProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};