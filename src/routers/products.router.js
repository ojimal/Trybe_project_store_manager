const { Router } = require('express');
const { productsController } = require('../controllers');

const router = Router();

router.get('/', productsController.findAllProducts);
router.get('/:id', productsController.findProductById);

module.exports = router;