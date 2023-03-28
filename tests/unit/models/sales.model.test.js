const chai = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/db/connection");

const { expect } = chai;

const { salesModel } = require("../../../src/models");
const { salesProductMock } = require("./mocks/sales.model.mock");

describe("Teste de unidade do sales.Model", () => {
  it("testa addSale", async () => {
    const [salesMock] = salesProductMock;

    sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);

    const result = await salesModel.addSale(salesMock);

    expect(result).to.be.deep.equal(1);
  });

  it("testa addSaleProduct", async () => {
    const [salesMock] = salesProductMock;

    sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);

    const result = await salesModel.addSaleProduct(
      salesMock.saleId,
      salesMock.productId,
      salesMock.quantity
    );

    expect(result).to.be.deep.equal(1);
  });

  it("testa findAllSales", async () => {
    sinon.stub(connection, "execute").resolves([salesProductMock]);

    const result = await salesModel.findAllSales();

    expect(result).to.be.deep.equal(salesProductMock);
  });

  it("testa findSaleById", async () => {
    const salesMock = salesProductMock;
    sinon.stub(connection, "execute").resolves([salesProductMock]);

    const result = await salesModel.findSaleById(1);

    expect(result).to.be.deep.equal(salesMock);
  });

  afterEach(() => sinon.restore());
});
