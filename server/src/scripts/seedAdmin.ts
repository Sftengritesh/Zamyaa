import dotenv from 'dotenv'
import { connectMongo, isMongoActive } from '../db/mongo.js'
import { UserModel } from '../models/User.js'
import { db } from '../db/store.js'
import { hashPassword } from '../middleware/auth.js'

dotenv.config()

async function seedAdmin() {
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@zamyaa.in').trim().toLowerCase()
  const adminPassword = process.env.ADMIN_PASSWORD || 'zamyaa_Admin_2026!'
  const adminName = process.env.ADMIN_NAME || 'Jyoti Sharma'

  console.log(`\n✦ Seeding initial administrator account for ZAMYAA Atelier: ${adminEmail}`)

  await connectMongo()

  const hashedPassword = await hashPassword(adminPassword)

  if (isMongoActive()) {
    const existing = await UserModel.findOne({ email: adminEmail })
    if (existing) {
      existing.password = hashedPassword
      existing.role = 'admin'
      existing.status = 'active'
      existing.name = adminName
      await existing.save()
      console.log(`✦ MongoDB Atlas: Updated existing administrator account: ${adminEmail}`)
    } else {
      await UserModel.create({
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        status: 'active',
      })
      console.log(`✦ MongoDB Atlas: Successfully created administrator: ${adminEmail}`)
    }
  } else {
    const existing = db.getUserByEmail(adminEmail)
    if (existing) {
      existing.password = hashedPassword
      existing.role = 'admin'
      existing.status = 'active'
      existing.name = adminName
      db.save()
      console.log(`✦ Local Store: Updated existing administrator account: ${adminEmail}`)
    } else {
      db.createUser({
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        status: 'active',
      })
      console.log(`✦ Local Store: Successfully created administrator: ${adminEmail}`)
    }
  }

  console.log('✦ Seed script completed successfully.\n')
  process.exit(0)
}

seedAdmin().catch((err) => {
  console.error('Seed Admin Error:', err)
  process.exit(1)
})

