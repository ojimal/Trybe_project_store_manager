const addedSaleMock = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 5
    }
  ]
};

const salesListMock = [
  {
    saleId: 1,
    date: "2023-03-23T21:45:00.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: "2023-03-23T21:45:00.000Z",
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: "2023-03-23T21:45:00.000Z",
    productId: 3,
    quantity: 15,
  },
];

module.exports = {
  addedSaleMock,
  salesListMock,
};