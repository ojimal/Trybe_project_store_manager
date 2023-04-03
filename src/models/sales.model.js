const connection = require('../db/connection');

const addSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUE (NOW())',
  );

  return insertId;
};

const addSaleProduct = async (saleId, productId, quantity) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return insertId;
};
const findAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT s.id AS saleId, s.date, p.product_id AS productId, p.quantity FROM sales AS s
    INNER JOIN sales_products AS p
    ON s.id = p.sale_id`,
  );
  return result;
};

const findSaleById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT s.date, p.product_id AS productId, p.quantity FROM sales AS s
    INNER JOIN sales_products AS p ON s.id = p.sale_id
    WHERE s.id = ?`, [saleId],
  );
  return result;
};

const deleteSaleProduct = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM sales_products WHERE sale_id = ?',
    [id],
  );
  return result;
};

module.exports = {
  addSale,
  addSaleProduct,
  findAllSales,
  findSaleById,
  deleteSaleProduct,
};