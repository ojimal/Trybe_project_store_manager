// reference trybecar msc exercise
// reference trybe course Arquitetura de Software: Camada Service - validações
const { idSchema, nameSchema } = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateProductName = (name) => {
  const { error } = nameSchema.validate({ name });

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateProductName,
};