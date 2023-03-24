const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const addSaleProduct = async (req, res) => {
  const saleProduct = req.body;
  const { type, message } = await salesService.addSaleProduct(saleProduct);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  addSaleProduct,
};