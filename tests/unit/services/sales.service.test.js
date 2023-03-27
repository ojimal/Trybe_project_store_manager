const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { salesModel } = require("../../../src/models");
const { salesService } = require("../../../src/services");

describe("Teste de unidade do sales.Service", () => {
  describe("testa addSaleProduct", () => {
    it("retorna status 200 e cria uma nova venda", async () => {
      sinon.stub(salesModel, "addSale").resolves(1);
      sinon.stub(salesModel, "addSaleProduct").resolves(1);
      sinon.stub(salesModel, "findSaleProductById").resolves(1);

      const result = await salesService.addSaleProduct([
        { productId: 1, quantity: 1 },
      ]);

      expect(result.type).to.be.equal(undefined);
      expect(result.message).to.deep.equal({
        id: 1,
        itemsSold: [{ productId: 1, quantity: 1 }],
      });
    });

    it("retorna status 422 e a quantidade de produto é inválida", async () => {
      sinon.stub(salesModel, "findSaleProductById").resolves(1);

      const result = await salesService.addSaleProduct([
        { productId: 1, quantity: 0 },
      ]);

      expect(result.type).to.be.deep.equal("INVALID_VALUE");
      expect(result.message).to.be.deep.equal(
        '"quantity" must be greater than or equal to 1'
      );
    });

    it("retorna status 404 e producto nao encontrado", async () => {
      sinon.stub(salesModel, "findSaleProductById").resolves(undefined);

      const result = await salesService.addSaleProduct([
        { productId: 1, quantity: 1 },
      ]);

      expect(result.type).to.be.deep.equal("PRODUCT_NOT_FOUND");
      expect(result.message).to.be.deep.equal("Product not found");
    });

    it("retorna status 400 e quantity required", async () => {
      sinon.stub(salesModel, "findSaleProductById").resolves(1);

      const result = await salesService.addSaleProduct([{ productId: 1 }]);

      expect(result.type).to.be.deep.equal("VALUE_REQUIRED");
      expect(result.message).to.be.deep.equal('"quantity" is required');
    });
  });
  afterEach(() => sinon.restore());
});

// [{ productId: 1, quantity: 0 }];
