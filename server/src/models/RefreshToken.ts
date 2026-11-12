import mongoose, { Schema, Document } from 'mongoose'

export interface IRefreshToken extends Document {
  tokenHash: string
  userId: string
  userEmail: string
  role: 'customer' | 'admin'
  familyId: string // Unique family ID for token rotation & reuse detection
  isRevoked: boolean
  expiresAt: Date
  createdAt: Date
}

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    tokenHash: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    userEmail: { type: String, required: true, lowercase: true, index: true },
    role: { type: String, enum: ['customer', 'admin'], required: true },
    familyId: { type: String, required: true, index: true },
    isRevoked: { type: Boolean, default: false, index: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } }, // Auto-expire from MongoDB TTL index
  },
  { timestamps: true }
)

export const RefreshTokenModel =
  mongoose.models.RefreshToken || mongoose.model<IRefreshToken>('RefreshToken', RefreshTokenSchema)

