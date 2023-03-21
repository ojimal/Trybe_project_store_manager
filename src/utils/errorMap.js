// reference trybecar msc exercise
// reference trybe course Arquitetura de Software: Camada Controller - Implementando um CRUD do zero - Parte 1
const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  INVALID_VALUE: 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};