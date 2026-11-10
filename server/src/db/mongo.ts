import mongoose from 'mongoose'

let isConnected = false

export async function connectMongo(): Promise<boolean> {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.log('✦ MongoDB Atlas: MONGODB_URI not provided. Running in high-reliability file-backed mode (db.json).')
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
    console.warn('✦ MongoDB Atlas connection warning (falling back to local file store):', (error as Error).message)
    isConnected = false
    return false
  }
}

export function isMongoActive(): boolean {
  return isConnected && mongoose.connection.readyState === 1
}

