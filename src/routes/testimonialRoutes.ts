import express from 'express';
import { createTestimonial, getTestimonials, deleteTestimonial, updateTestimonial } from '../controllers/testimonialController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .post(protect, createTestimonial)
  .get(getTestimonials);

router.route('/:id')
  .put(protect, updateTestimonial)
  .delete(protect, deleteTestimonial);

export default router;
