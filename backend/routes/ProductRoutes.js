const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const userAuthRole = require('../middleware/authMiddleware');
router.use(userAuthRole);


router.get('/getProducts', ProductController.getProducts);
router.post('/createProduct', ProductController.createProduct)
router.put('/updateProduct/:id', ProductController.updateProduct)
router.delete('/deleteProduct/:id', ProductController.deleteProduct)


module.exports = router;