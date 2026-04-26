import mongoose, { Document, Schema } from 'mongoose';

export interface ICoupon extends Document {
  code: string;
  discount: string;
  usageLimit?: number;
  minPurchaseAmount?: number;
  applicableProducts: mongoose.Types.ObjectId[];
  expiryDate: Date;
  status: string;
}

const couponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, trim: true, uppercase: true },
    discount: { type: String, required: true },
    usageLimit: { type: Number },
    minPurchaseAmount: { type: Number },
    applicableProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    expiryDate: { type: Date, required: true },
    status: { type: String, default: 'ACTIVE' },
  },
  { timestamps: true }
);

export const Coupon = mongoose.model<ICoupon>('Coupon', couponSchema);
