const chai = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/db/connection");
const {
  productsListMock,
  newProductMock,
} = require("./mocks/products.model.mock");
const { productsModel } = require("../../../src/models");

const { expect } = chai;

describe("Teste de unidade do products.Model", () => {
  describe("Listando todos os produtos", () => {
    it("Deve retornar o estado 200 e a lista", async () => {
      sinon.stub(connection, "execute").resolves([productsListMock]);
      const result = await productsModel.findAllProducts();

      expect(result).to.be.deep.equal(productsListMock);
    });
  });

  describe("Listando produto por id", () => {
    it("Deve retornar o estado 200 e o produto", async () => {
      sinon.stub(connection, "execute").resolves([[productsListMock[1]]]);

      const result = await productsModel.findProductById(2);

      expect(result).to.be.deep.equal(productsListMock[1]);
    });
  });

  describe("Cadastro de um novo produto", () => {
    it("Deve retornar o estado 200 e o produto", async () => {
      sinon.stub(connection, "execute").resolves([{ insertId: 4 }]);

      const result = await productsModel.addProduct(newProductMock);

      expect(result).to.be.equal(4);
    });
  });

  describe("Testa updateProduct", () => {
    it("Deve retornar o estado 200 e o produto", async () => {
      sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

      const result = await productsModel.updateProduct(productsListMock[0].id, productsListMock[0].name);

      expect(result.affectedRows).to.be.equal(1);
    });
  });
  afterEach(() => sinon.restore());
});
