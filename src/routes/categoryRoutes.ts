import express from 'express';
import { createCategory, getCategories, deleteCategory, updateCategory } from '../controllers/categoryController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .post(protect, createCategory)
  .get(getCategories);

router.route('/:id')
  .put(protect, updateCategory)
  .delete(protect, deleteCategory);

export default router;
