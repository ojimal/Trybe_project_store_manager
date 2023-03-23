const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { productsController } = require("../../../src/controllers");
const { productsService } = require("../../../src/services");
const {
  productMock,
  newProductMock,
} = require("./mocks/products.controller.mock");
const { validateProductName } = require("../../../src/middlewares");

describe("Teste de unidade do products.Controller", () => {
  describe("Listando todos os produtos", () => {
    it("Deve retornar o estado 200 e a lista", async () => {
      // arrange
      const res = {};
      const req = {};
      const allProducts = [productMock];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "findAllProducts")
        .resolves({ type: null, message: allProducts });

      // act
      await productsController.findAllProducts(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });

    it("Deve retornar o erro caso não exista produtos", async () => {
      // arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "findAllProducts")
        .resolves({ type: 'SERVER_ERROR', message: 'Internal Server Error' });

      // act
      await productsController.findAllProducts(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith('Internal Server Error');
    });
  });

  describe("Listando produto por id", () => {
    it("Deve retornar o estado 200 e o produto", async () => {
      // arrange
      const res = {};
      const req = {
        params: { id: 2 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "findProductById")
        .resolves({ type: null, message: productMock });

      // act
      await productsController.findProductById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productMock);
    });

    it("Deve retornar o estado 404 e Id não encontrado", async () => {
      // arrange
      const res = {};
      const req = {
        params: { id: 2 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "findProductById")
        .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

      // act
      await productsController.findProductById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });
  });

  describe("Cadastro de um novo produto", () => {
    it("Deve retornar o estado 200 e o produto", async () => {
      // arrange
      const res = {};
      const req = {
        body: { name: "new product" },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "addProduct")
        .resolves({ type: null, message: newProductMock });

      // act
      await productsController.addProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(newProductMock);
    });

    it('Deve retornar o estado 400 e "name is required"', async () => {
      // arrange
      const res = {};
      const req = {
        body: {},
      };

      const next = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      // act
      await validateProductName(req, res, next);

      // assert
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"name" is required',
      });
      expect(next).to.have.not.been.called;
    });

  it('Deve retornar o estado 404 e "name" length must be > 5', async () => {
    // arrange
    const res = {};
    const req = {
      body: { name: 'abc' },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, "addProduct")
      .resolves({
        type: 'INVALID_VALUE',
        message: '"name" length must be at least 5 characters long',
      });

    // act
    await productsController.addProduct(req, res);

    // assert
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' }); });
  });

  afterEach(function () {
    sinon.restore();
  });
});
