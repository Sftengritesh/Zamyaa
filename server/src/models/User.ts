import mongoose, { Schema, Document } from 'mongoose'

export interface IUserAddress {
  type?: 'home' | 'work' | 'other'
  address: string
  city: string
  state: string
  pincode: string
  country?: string
  isDefault?: boolean
}

export interface IUser extends Document {
  id: string
  name: string
  email: string
  password: string
  role: 'customer' | 'admin'
  status: 'active' | 'suspended'
  phone?: string
  avatar?: string
  addresses?: IUserAddress[]
  refreshToken?: string
  createdAt: Date
  updatedAt: Date
  toSafeJSON(): Record<string, any>
}

const UserAddressSchema = new Schema<IUserAddress>(
  {
    type: { type: String, enum: ['home', 'work', 'other'], default: 'home' },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: 'India' },
    isDefault: { type: Boolean, default: false },
  },
  { _id: false }
)

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
      index: true,
    },
    status: {
      type: String,
      enum: ['active', 'suspended'],
      default: 'active',
      index: true,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    addresses: {
      type: [UserAddressSchema],
      default: [],
    },
    refreshToken: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id ? ret._id.toString() : ret.id
        delete ret._id
        delete ret.__v
        delete ret.password
        delete ret.refreshToken
        return ret
      },
    },
  }
)

UserSchema.methods.toSafeJSON = function () {
  const obj = this.toObject ? this.toObject() : { ...this }
  obj.id = obj._id ? obj._id.toString() : obj.id
  delete obj._id
  delete obj.__v
  delete obj.password
  delete obj.refreshToken
  return obj
}

export const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

