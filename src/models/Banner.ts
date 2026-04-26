import mongoose, { Document, Schema } from 'mongoose';

export interface IBanner extends Document {
  title: string;
  description: string;
  image: string;
  status: string;
}

const bannerSchema = new Schema<IBanner>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: String, default: 'ACTIVE' },
  },
  { timestamps: true }
);

export const Banner = mongoose.model<IBanner>('Banner', bannerSchema);
