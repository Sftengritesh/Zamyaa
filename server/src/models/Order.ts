import mongoose, { Schema, Document } from 'mongoose'

export interface IOrderItem {
  productId: string
  slug: string
  name: string
  size: string
  color: string
  quantity: number
  unitPrice: number
  totalItemPrice: number
  image: string
}

export interface IOrder extends Document {
  orderNumber: string
  customer: {
    name: string
    email: string
    phone: string
  }
  shippingAddress: {
    address: string
    city: string
    state: string
    pincode: string
    country: string
  }
  items: IOrderItem[]
  subtotal: number
  discount: number
  shippingFee: number
  tax: number
  total: number
  currency: string
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'cod' | 'razorpay'
  fulfillmentStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  razorpayOrderId?: string
  razorpayPaymentId?: string
  razorpaySignature?: string
  trackingNumber?: string
  courier?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: String, required: true },
    slug: { type: String, required: true },
    name: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
    totalItemPrice: { type: Number, required: true, min: 0 },
    image: { type: String, default: '' },
  },
  { _id: false }
)

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    customer: {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true, lowercase: true },
      phone: { type: String, required: true, trim: true },
    },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, default: 'India' },
    },
    items: { type: [OrderItemSchema], required: true },
    subtotal: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    shippingFee: { type: Number, default: 0, min: 0 },
    tax: { type: Number, default: 0, min: 0 },
    total: { type: Number, required: true, min: 0 },
    currency: { type: String, default: '₹' },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'upi', 'netbanking', 'cod', 'razorpay'],
      default: 'card',
    },
    fulfillmentStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
      index: true,
    },
    razorpayOrderId: { type: String, sparse: true },
    razorpayPaymentId: { type: String, sparse: true },
    razorpaySignature: { type: String },
    trackingNumber: { type: String, default: '' },
    courier: { type: String, default: '' },
    notes: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
)

export const OrderModel = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)

