const { Router } = require('express');
const { salesController } = require('../controllers');

const router = Router();

router.get('/', salesController.findAllSales);
router.get('/:id', salesController.findSaleById);
router.post('/', salesController.addSaleProduct);

module.exports = router;
