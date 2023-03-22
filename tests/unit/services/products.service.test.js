const chai = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services/');
const { productsListMock, invalidValue } = require('./mocks/products.service.mock');

const { expect } = chai;

describe('Testes de unidade da camada products.Service', () => {
  describe('Listando todos os produtos', () => {
    it('Deve retornar o estado 200 e a lista', async () => {
      sinon.stub(productsModel, 'findAllProducts').resolves(productsListMock);

      const result = await productsService.findAllProducts();

      expect(result.message).to.deep.equal(productsListMock);
    });
  }); -

  describe('Listando produto por id', () => {
    it('Deve retornar o estado 200 e a lista', async () => {
      sinon.stub(productsModel, 'findProductById').resolves(productsListMock[0]);

      const result = await productsService.findProductById(2);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(productsListMock[0]);
    });

    it('Deve retornar o estado 422 e Id invalido', async () => {
      sinon.stub(productsModel, 'findProductById').resolves('x');
      const result = await productsService.findProductById(invalidValue);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('Deve retornar o estado 404 e Id não encontrado', async () => {
      sinon.stub(productsModel, 'findProductById').resolves(undefined);

      const result = await productsService.findProductById(99999);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    })
  });

  afterEach(function () {
    sinon.restore();
  });
});