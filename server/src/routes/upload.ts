import { Router, Request, Response } from 'express'
import multer from 'multer'
import cloudinary from '../config/cloudinary.js'
import { authMiddleware, requireAdmin } from '../middleware/auth.js'

const uploadRouter = Router()

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB limit

// Use memory storage so we stream directly to Cloudinary
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid image format. Only JPEG, PNG, and WebP are accepted.'))
    }
  },
})

// Upload single image (via file or base64 data URI)
uploadRouter.post('/image', authMiddleware, requireAdmin, upload.single('image'), async (req: Request, res: Response) => {
  try {
    const folder = req.body.folder || 'zamyaa/products'

    // If file sent via multipart/form-data
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString('base64')
      const dataURI = `data:${req.file.mimetype};base64,${b64}`

      const result = await cloudinary.uploader.upload(dataURI, {
        folder,
        resource_type: 'image',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      })

      return res.json({
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
      })
    }

    // Or if base64/URL sent in JSON body
    if (req.body.image) {
      const result = await cloudinary.uploader.upload(req.body.image, {
        folder,
        resource_type: 'image',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      })

      return res.json({
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
      })
    }

    return res.status(400).json({ success: false, message: 'No image file or URL provided' })
  } catch (error: any) {
    console.error('Cloudinary Upload Error:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Image upload failed',
    })
  }
})

// Upload multiple images at once
uploadRouter.post('/images', authMiddleware, requireAdmin, upload.array('images', 8), async (req: Request, res: Response) => {
  try {
    const folder = req.body.folder || 'zamyaa/products'
    const files = req.files as Express.Multer.File[]

    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, message: 'No image files uploaded' })
    }

    const uploadPromises = files.map(async (file) => {
      const b64 = Buffer.from(file.buffer).toString('base64')
      const dataURI = `data:${file.mimetype};base64,${b64}`
      const result = await cloudinary.uploader.upload(dataURI, {
        folder,
        resource_type: 'image',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      })
      return {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
      }
    })

    const results = await Promise.all(uploadPromises)
    return res.json({ success: true, images: results })
  } catch (error: any) {
    console.error('Cloudinary Bulk Upload Error:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Bulk upload failed',
    })
  }
})

// Delete image from Cloudinary
uploadRouter.delete('/:publicId(*)', authMiddleware, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { publicId } = req.params
    if (!publicId) {
      return res.status(400).json({ success: false, message: 'publicId parameter is required' })
    }

    const result = await cloudinary.uploader.destroy(publicId)
    return res.json({ success: true, result })
  } catch (error: any) {
    console.error('Cloudinary Delete Error:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Image deletion failed',
    })
  }
})

export default uploadRouter

