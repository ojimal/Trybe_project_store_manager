// reference trybecar msc exercise
// reference trybe course Arquitetura de Software: Camada Controller - Implementando um CRUD do zero - Parte 1
const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');

const findAllProducts = async (_req, res) => {
  const { type, message } = await productsService.findAllProducts();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const findProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findProductById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const addProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.addProduct(name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  findAllProducts,
  findProductById,
  addProduct,
};