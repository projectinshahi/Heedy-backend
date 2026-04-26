import express from 'express';
import { createProduct, getProducts, deleteProduct, updateProduct } from '../controllers/productController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .post(protect, createProduct)
  .get(getProducts);

router.route('/:id')
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

export default router;
