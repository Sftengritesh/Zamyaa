import { Router, Request, Response } from 'express'
import { db } from '../db/store.js'

const customersRouter = Router()

// List customers
customersRouter.get('/', (req: Request, res: Response) => {
  let list = db.getData().customers
  const { search } = req.query

  if (search) {
    const q = String(search).toLowerCase()
    list = list.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.city.toLowerCase().includes(q)
    )
  }

  res.json({ success: true, count: list.length, customers: list })
})

// Single customer
customersRouter.get('/:id', (req: Request, res: Response) => {
  const customer = db.getData().customers.find((c) => c.id === req.params.id)
  if (!customer) {
    return res.status(404).json({ success: false, message: 'Customer not found' })
  }

  // Get customer's orders
  const orders = db.getOrders().filter((o) => o.customer.email === customer.email)

  res.json({ success: true, customer, orders })
})

export default customersRouter
