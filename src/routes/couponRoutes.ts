import express from 'express';
import { createCoupon, getCoupons, deleteCoupon, updateCoupon } from '../controllers/couponController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .post(protect, createCoupon)
  .get(getCoupons);

router.route('/:id')
  .put(protect, updateCoupon)
  .delete(protect, deleteCoupon);

export default router;
