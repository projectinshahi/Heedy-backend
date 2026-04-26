import express from 'express';
import { createBanner, getBanners, deleteBanner, updateBanner } from '../controllers/bannerController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .post(protect, createBanner)
  .get(getBanners);

router.route('/:id')
  .put(protect, updateBanner)
  .delete(protect, deleteBanner);

export default router;
