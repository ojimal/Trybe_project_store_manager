// reference trybecar msc exercise
// reference trybe course Dia 2: Arquitetura de Software: Camada Service - validações
const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

module.exports = {
  idSchema,
};