const chai = require("chai");
const sinon = require("sinon");

const { productsModel } = require("../../../src/models");
const { productsService } = require("../../../src/services/");
const {
  productsListMock,
  invalidValue,
  newProductMock,
  invalidNameLenght,
} = require("./mocks/products.service.mock");

const { expect } = chai;

describe("Testes de unidade da camada products.Service", () => {
  describe("Listando todos os produtos", () => {
    it("Deve retornar o estado 200 e a lista", async () => {
      sinon.stub(productsModel, "findAllProducts").resolves(productsListMock);

      const result = await productsService.findAllProducts();

      expect(result.message).to.deep.equal(productsListMock);
    });
  });
  -describe("Listando produto por id", () => {
    it("Deve retornar o estado 200 e a lista", async () => {
      sinon
        .stub(productsModel, "findProductById")
        .resolves(productsListMock[0]);

      const result = await productsService.findProductById(2);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(productsListMock[0]);
    });

    it("Deve retornar o estado 422 e Id invalido", async () => {
      sinon.stub(productsModel, "findProductById").resolves("x");
      const result = await productsService.findProductById(invalidValue);

      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.equal('"id" must be a number');
    });

    it("Deve retornar o estado 404 e Id não encontrado", async () => {
      sinon.stub(productsModel, "findProductById").resolves(undefined);

      const result = await productsService.findProductById(99999);

      expect(result.type).to.equal("PRODUCT_NOT_FOUND");
      expect(result.message).to.equal("Product not found");
    });
  });

  describe("Cadastro de um novo produto", () => {
    it("Deve retornar o estado 200 e o produto", async () => {
      sinon.stub(productsModel, "addProduct").resolves(3);
      sinon.stub(productsModel, "findProductById").resolves(newProductMock);

      const result = await productsService.addProduct("new product");

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(newProductMock);
    });

    it('Deve retornar o estado 422 e "name" length must be > 5', async () => {
      const result = await productsService.addProduct(invalidNameLenght);

      expect(result.type).to.be.equal("INVALID_VALUE");
      expect(result.message).to.deep.equal(
        '"name" length must be at least 5 characters long'
      );
    });
  });

  describe("Testa updateProduct", () => {
    it("Deve retornar o estado 200 e o produto", async () => {
      sinon.stub(productsModel, "updateProduct").resolves(1);

      const result = await productsService.updateProduct(
        productsListMock[0].id,
        productsListMock[0].name
      );

      expect(result.type).to.be.deep.equal(null);
      expect(result.message).to.be.deep.equal(productsListMock[0].name);
    });
    it("Deve retornar o estado 404 product not found", async () => {
      sinon.stub(productsModel, "findProductById").resolves(undefined);

      const result = await productsService.updateProduct(999, "valid_name");

      expect(result.type).to.be.deep.equal("PRODUCT_NOT_FOUND");
      expect(result.message).to.be.deep.equal("Product not found");
    });
    it("Deve retornar o estado 400 invalid value", async () => {

      const result = await productsService.updateProduct(999, "test");

      expect(result.type).to.be.deep.equal("INVALID_VALUE");
      expect(result.message).to.be.deep.equal('"name" length must be at least 5 characters long');
    });
    it("Deve retornar o estado 400 name is required", async () => {

      const result = await productsService.updateProduct(1);

      expect(result.type).to.be.deep.equal("VALUE_REQUIRED");
      expect(result.message).to.be.deep.equal('"name" is required');
    });
  });

  afterEach(() => sinon.restore());
});
