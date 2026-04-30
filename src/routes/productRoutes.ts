import express from 'express';
import { createProduct, getProducts, deleteProduct, updateProduct } from '../controllers/productController';
import { protect } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';

const router = express.Router();

router.route('/')
  .post(protect, upload.array('imageFiles', 5), createProduct)
  .get(getProducts);

router.route('/:id')
  .put(protect, upload.array('imageFiles', 5), updateProduct)
  .delete(protect, deleteProduct);

export default router;
