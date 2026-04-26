import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { asyncHandler } from '../utils/asyncHandler';
import { successResponse, errorResponse } from '../utils/responseHandler';

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  successResponse(res, 201, 'Product created successfully', product);
});

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find().sort({ createdAt: -1 });
  successResponse(res, 200, 'Products fetched successfully', products);
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return errorResponse(res, 404, 'Product not found');
  }
  
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  
  successResponse(res, 200, 'Product updated successfully', product);
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return errorResponse(res, 404, 'Product not found');
  }
  successResponse(res, 200, 'Product deleted successfully', null);
});
