import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  clientName: string;
  clientRole: string;
  review: string;
  rating: number;
  imageUrl?: string;
  status: string;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    clientName: { type: String, required: true, trim: true },
    clientRole: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    imageUrl: { type: String },
    status: { type: String, default: 'ACTIVE' },
  },
  { timestamps: true }
);

export const Testimonial = mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
