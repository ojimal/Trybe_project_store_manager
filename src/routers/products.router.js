const { Router } = require('express');
const { productsController } = require('../controllers');
const validateProductName = require('../middlewares/validateProductName');

const router = Router();

router.get('/', productsController.findAllProducts);
router.get('/:id', productsController.findProductById);
router.post('/', validateProductName, productsController.addProduct);

module.exports = router;