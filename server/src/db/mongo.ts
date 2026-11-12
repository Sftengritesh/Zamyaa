import mongoose from 'mongoose'

let isConnected = false

export async function connectMongo(): Promise<boolean> {
  const uri = process.env.MONGODB_URI
  const isProduction = process.env.NODE_ENV === 'production'

  if (!uri) {
    if (isProduction) {
      console.error('FATAL: MONGODB_URI is required when running in production mode (NODE_ENV=production).')
      console.error('File-backed JSON persistence and in-memory store are strictly disabled in production.')
      process.exit(1)
    }
    console.log('✦ MongoDB Atlas: MONGODB_URI not provided. Running in development file-backed mode (db.json).')
    return false
  }

  try {
    if (mongoose.connection.readyState >= 1) {
      isConnected = true
      return true
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    })
    isConnected = true
    console.log('✦ MongoDB Atlas: Successfully connected to cluster')
    return true
  } catch (error) {
    if (isProduction) {
      console.error('FATAL: Failed to connect to MongoDB Atlas in production:', (error as Error).message)
      console.error('Refusing to fall back to JSON storage in production.')
      process.exit(1)
    }
    console.warn('✦ MongoDB Atlas connection warning (falling back to local file store in development):', (error as Error).message)
    isConnected = false
    return false
  }
}

export function isMongoActive(): boolean {
  return isConnected && mongoose.connection.readyState === 1
}

