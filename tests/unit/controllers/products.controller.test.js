const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');
const { productMock } = require('./mocks/products.controller.mock');

describe('Teste de unidade do productsController', () => {

  describe('Listando os produtos', () => {
    it('Deve retornar o estado 200 e a lista', async () => {
      // arrange
      const res = {};
      const req = {};
      const allProducts = [productMock];
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findAllProducts')
        .resolves({ type: null, message: allProducts })
      
      // act
      await productsController.findAllProducts(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(findAllProducts);
    });
  });

  describe('Listando produto por id', () => {
    it('Deve retornar o estado 200 e o produto', async () => {
      // arrange
      const res = {};
      const req = {
        params: { id:2 },
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findProductById')
        .resolves({ type: null, message: productMock })
      
      // act
      await productsController.findProductById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productMock);
    });
        it('Deve retornar o estado 404 e Id não encontrado', async () => {
      // arrange
      const res = {};
      const req = {
        params: { id:2 },
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findProductById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' })
      
      // act
      await productsController.findProductById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});