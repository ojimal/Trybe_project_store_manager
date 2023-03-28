const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { salesController } = require("../../../src/controllers");
const { salesService } = require("../../../src/services");
const {
  addedSaleMock,
  salesListMock,
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

  describe("findAllSales", () => {
    it("retorna status 200 e as sales listadas", async () => {
      const req = {};
      const res = {};
      sinon.stub(salesService, "findAllSales").resolves(salesListMock);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.findAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesListMock);
    });
  });

  describe("findSaleById", () => {
    it("retorna status 200 e a sale by id", async () => {
      const [result] = salesListMock;
      const req = { params: { id: 1 } };
      const res = {};

      sinon
        .stub(salesService, "findSaleById")
        .resolves({ type: null, message: result });

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.findSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(result);
    });
    it("retorna status 422 e id invalido", async () => {
      const req = { params: { id: 'x' } };
      const res = {};

      sinon
        .stub(salesService, "findSaleById")
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.findSaleById(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });
  });

  afterEach(() => sinon.restore());
});
