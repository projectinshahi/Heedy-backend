"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCoupon = exports.updateCoupon = exports.getCoupons = exports.createCoupon = void 0;
const Coupon_1 = require("../models/Coupon");
const asyncHandler_1 = require("../utils/asyncHandler");
const responseHandler_1 = require("../utils/responseHandler");
exports.createCoupon = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const coupon = await Coupon_1.Coupon.create(req.body);
    (0, responseHandler_1.successResponse)(res, 201, 'Coupon created successfully', coupon);
});
exports.getCoupons = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const coupons = await Coupon_1.Coupon.find().sort({ createdAt: -1 }).populate('applicableProducts', 'name');
    (0, responseHandler_1.successResponse)(res, 200, 'Coupons fetched successfully', coupons);
});
exports.updateCoupon = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    let coupon = await Coupon_1.Coupon.findById(req.params.id);
    if (!coupon) {
        return (0, responseHandler_1.errorResponse)(res, 404, 'Coupon not found');
    }
    coupon = await Coupon_1.Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    (0, responseHandler_1.successResponse)(res, 200, 'Coupon updated successfully', coupon);
});
exports.deleteCoupon = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const coupon = await Coupon_1.Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) {
        return (0, responseHandler_1.errorResponse)(res, 404, 'Coupon not found');
    }
    (0, responseHandler_1.successResponse)(res, 200, 'Coupon deleted successfully', null);
});
//# sourceMappingURL=couponController.js.map