import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'c8deakbl',
  api_key: process.env.CLOUDINARY_API_KEY || '554167786245443',
  api_secret: process.env.CLOUDINARY_API_SECRET || '4no60n6qyeLhJ0Bl3ULX0uHLt1Q',
  secure: true,
})

export default cloudinary
