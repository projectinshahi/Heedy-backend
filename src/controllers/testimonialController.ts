import { Request, Response } from 'express';
import { Testimonial } from '../models/Testimonial';
import { asyncHandler } from '../utils/asyncHandler';
import { successResponse, errorResponse } from '../utils/responseHandler';

export const createTestimonial = asyncHandler(async (req: Request, res: Response) => {
  const testimonial = await Testimonial.create(req.body);
  successResponse(res, 201, 'Testimonial created successfully', testimonial);
});

export const getTestimonials = asyncHandler(async (req: Request, res: Response) => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  successResponse(res, 200, 'Testimonials fetched successfully', testimonials);
});

export const updateTestimonial = asyncHandler(async (req: Request, res: Response) => {
  let testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    return errorResponse(res, 404, 'Testimonial not found');
  }
  testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  successResponse(res, 200, 'Testimonial updated successfully', testimonial);
});

export const deleteTestimonial = asyncHandler(async (req: Request, res: Response) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) {
    return errorResponse(res, 404, 'Testimonial not found');
  }
  successResponse(res, 200, 'Testimonial deleted successfully', null);
});
