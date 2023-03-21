const { productsModel } = require('../models');
const schema = require('./validations/validationInputsValue');

const findAllProducts = async () => {
  const all = await productsModel.findAllProducts();
  return { type: null, message: all };
};

const findProductById = async (productId) => {
  const err = schema.validateId(productId);
  if (err.type) return err;

  const item = await productsModel.findProductById(productId);
  if (!item) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: item };
};

module.exports = {
  findAllProducts,
  findProductById,
};