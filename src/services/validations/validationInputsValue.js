// reference trybecar msc exercise
// reference trybe course Arquitetura de Software: Camada Service - validações
const { idSchema, nameSchema, saleSchema } = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateProductName = (name) => {
  if (!name) return { type: 'VALUE_REQUIRED', message: '"name" is required' };

  const { error } = nameSchema.validate({ name });

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateSaleProduct = (saleProduct) => {
  const { error } = saleSchema.validate(saleProduct);
  if (error) {
    if (error.message.includes('is required')) {
      return { type: 'VALUE_REQUIRED', message: error.message };
     }
    if (error.message.includes('greater than')) {
      return { type: 'INVALID_VALUE', message: error.message };      
    }
  }
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateProductName,
  validateSaleProduct,
};