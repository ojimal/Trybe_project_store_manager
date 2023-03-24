// reference trybecar msc exercise
// reference trybe course Dia 2: Arquitetura de Software: Camada Service - validações
const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const nameSchema = Joi.object({
  name: Joi.string().min(5).required().label('name'),
});

const saleSchema = Joi.array().items(Joi.object({
  productId: Joi.number().integer().required().label('productId'),
  quantity: Joi.number().integer().min(1).required()
.label('quantity'),
}));

module.exports = {
  idSchema,
  nameSchema,
  saleSchema,
};