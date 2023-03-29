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

const addProduct = async (name) => {
  const err = schema.validateProductName(name);
  if (err.type) return err;
  const addedId = await productsModel.addProduct(name);
  const addedProduct = await productsModel.findProductById(addedId);
  return { type: null, message: addedProduct };
};

const updateProduct = async (id, name) => { 
  const err = schema.validateProductName(name);
  if (err.type) return err;
  const result = await productsModel.updateProduct(id, name);
  if (result.affectedRows < 1) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: name };
};

const deleteProduct = async (id) => {
  const err = schema.validateId(id);
  if (err.type) return err;
  const result = await productsModel.deleteProduct(id);
  if (result.affectedRows < 1) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: '' };
};

module.exports = {
  findAllProducts,
  findProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};