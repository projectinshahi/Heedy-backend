"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTestimonial = exports.updateTestimonial = exports.getTestimonials = exports.createTestimonial = void 0;
const Testimonial_1 = require("../models/Testimonial");
const asyncHandler_1 = require("../utils/asyncHandler");
const responseHandler_1 = require("../utils/responseHandler");
exports.createTestimonial = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const testimonial = await Testimonial_1.Testimonial.create(req.body);
    (0, responseHandler_1.successResponse)(res, 201, 'Testimonial created successfully', testimonial);
});
exports.getTestimonials = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const testimonials = await Testimonial_1.Testimonial.find().sort({ createdAt: -1 });
    (0, responseHandler_1.successResponse)(res, 200, 'Testimonials fetched successfully', testimonials);
});
exports.updateTestimonial = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    let testimonial = await Testimonial_1.Testimonial.findById(req.params.id);
    if (!testimonial) {
        return (0, responseHandler_1.errorResponse)(res, 404, 'Testimonial not found');
    }
    testimonial = await Testimonial_1.Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    (0, responseHandler_1.successResponse)(res, 200, 'Testimonial updated successfully', testimonial);
});
exports.deleteTestimonial = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const testimonial = await Testimonial_1.Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
        return (0, responseHandler_1.errorResponse)(res, 404, 'Testimonial not found');
    }
    (0, responseHandler_1.successResponse)(res, 200, 'Testimonial deleted successfully', null);
});
//# sourceMappingURL=testimonialController.js.map