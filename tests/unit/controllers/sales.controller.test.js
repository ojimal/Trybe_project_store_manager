const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { salesController } = require("../../../src/controllers");
const { salesService } = require("../../../src/services");
const {
  addedSaleMock,
} = require("./mocks/sales.controller.mock");

describe("Teste de unidade do sales.Controller", () => {
  describe("Adiciona sale product", () => {
    it("Retorna status 201 e sale adicionado", async () =>  {
      const res = {};
      const req = {
        body: [{ productId: 1, quantity: 5 }],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "addSaleProduct")
        .resolves({ type: null, message: addedSaleMock });

      await salesController.addSaleProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(addedSaleMock);
    });

    it("Retona status 404 e mensagem de erro caso Id não exista", async () => {
      const res = {};
      const req = {
        body: [{ productId: 9999, quantity: 5 }],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "addSaleProduct")
        .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

      await salesController.addSaleProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });
  });

  afterEach(() => sinon.restore());
});
