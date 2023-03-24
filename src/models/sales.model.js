const connection = require('../db/connection');

const addSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUE (NOW())',
  );

  return insertId;
};

const addSaleProduct = async (saleId, productId, quantity) => {
  await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
};

const findSaleProductById = async (productId) => {
  const [[result]] = await connection.execute('SELECT * FROM sales WHERE id = ?',
    [productId]);
  return result;
};

module.exports = {
  addSale,
  addSaleProduct,
  findSaleProductById,
};