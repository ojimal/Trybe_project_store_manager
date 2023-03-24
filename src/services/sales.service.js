const { salesModel } = require('../models');
const schema = require('./validations/validationInputsValue');

const addSaleProduct = async (saleProducts) => {
  const error = schema.validateSaleProduct(saleProducts);
  if (error.type) { return error; }

  const checkSalesProducts = await Promise.all(saleProducts.map(async (item) => {
    const product = await salesModel.findSaleProductById(item.productId);
    return product;
  }));

  if (checkSalesProducts.includes(undefined)) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  const id = await salesModel.addSale();

  await Promise.all(saleProducts.map(async (item) => {
    await salesModel.addSaleProduct(id, item.productId, item.quantity);
  }));

  return { message: { id, itemsSold: saleProducts } };
};

module.exports = {
  addSaleProduct,
};