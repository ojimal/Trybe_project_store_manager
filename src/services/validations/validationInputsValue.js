// reference trybecar msc exercise
// reference trybe course Arquitetura de Software: Camada Service - validações
const { idSchema } = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

module.exports = {
  validateId,
};