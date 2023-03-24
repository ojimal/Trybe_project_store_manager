const { Router } = require('express');
const { salesController } = require('../controllers');

const router = Router();

router.post('/', salesController.addSaleProduct);

module.exports = router;
