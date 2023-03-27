const chai = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/db/connection");

const { expect } = chai;

const { salesModel } = require("../../../src/models");
const { salesProductMock } = require("./mocks/sales.model.mock");

describe("Teste de unidade do sales.Model", () => {
  it("testa findSaleProductById", async () => {
    const [saleMock] = salesProductMock;
    sinon.stub(connection, "execute").resolves([[saleMock]]);

    const sale = await salesModel.findSaleProductById(1);

    expect(sale).to.be.deep.equal(saleMock);
  });

  it("testa addSale", async () => {
    const [saleMock] = salesProductMock;

    sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);

    const insertId = await salesModel.addSale(saleMock);

    expect(insertId).to.be.deep.equal(1);
  });

  it("testa addSaleProduct", async () => {
    const [saleMock] = salesProductMock;

    sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);

    const insertId = await salesModel.addSaleProduct(
      saleMock.saleId,
      saleMock.productId,
      saleMock.quantity
    );

    expect(insertId).to.be.deep.equal(1);
  });

  afterEach(() => sinon.restore());
});
