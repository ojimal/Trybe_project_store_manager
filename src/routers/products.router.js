const { Router } = require('express');
const { productsController } = require('../controllers');

const router = Router();

router.get('/', productsController.findAllProducts);
router.get('/:id', productsController.findProductById);
router.post('/', productsController.addProduct);
router.put('/:id', productsController.updateProduct);

module.exports = router;