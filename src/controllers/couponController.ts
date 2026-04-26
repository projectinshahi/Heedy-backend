import { Request, Response } from 'express';
import { Coupon } from '../models/Coupon';
import { asyncHandler } from '../utils/asyncHandler';
import { successResponse, errorResponse } from '../utils/responseHandler';

export const createCoupon = asyncHandler(async (req: Request, res: Response) => {
  const coupon = await Coupon.create(req.body);
  successResponse(res, 201, 'Coupon created successfully', coupon);
});

export const getCoupons = asyncHandler(async (req: Request, res: Response) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 }).populate('applicableProducts', 'name');
  successResponse(res, 200, 'Coupons fetched successfully', coupons);
});

export const updateCoupon = asyncHandler(async (req: Request, res: Response) => {
  let coupon = await Coupon.findById(req.params.id);
  if (!coupon) {
    return errorResponse(res, 404, 'Coupon not found');
  }
  coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  successResponse(res, 200, 'Coupon updated successfully', coupon);
});

export const deleteCoupon = asyncHandler(async (req: Request, res: Response) => {
  const coupon = await Coupon.findByIdAndDelete(req.params.id);
  if (!coupon) {
    return errorResponse(res, 404, 'Coupon not found');
  }
  successResponse(res, 200, 'Coupon deleted successfully', null);
});
