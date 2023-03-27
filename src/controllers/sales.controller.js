const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const addSaleProduct = async (req, res) => {
  const saleProduct = req.body;
  const { type, message } = await salesService.addSaleProduct(saleProduct);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const findAllSales = async (_req, res) => {
  const result = await salesService.findAllSales();
  return res.status(200).json(result);
};

const findSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findSaleById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  addSaleProduct,
  findAllSales,
  findSaleById,
};