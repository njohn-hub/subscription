import { Router } from 'express'

import { authorize } from '../middlewares/auth.middleware.js'

import {
  createSubscription,
  getUserSubscription
} from '../controllers/subscription.controller.js'

const subscriptionRouter = Router()

// ============================================
// Specific routes FIRST
// ============================================

// Get user's subscriptions
subscriptionRouter.get(
  '/user/:id',
  authorize,
  getUserSubscription
)

// Get upcoming renewals
subscriptionRouter.get(
  '/upcoming-renewals',
  authorize,
  (req, res) => {
    res.send('get all upcoming renewal subscriptions')
  }
)

// ============================================
// General subscription routes
// ============================================

// Get all subscriptions
subscriptionRouter.get('/', (req, res) => {
  res.send('get all subscriptions')
})

// Create subscription
subscriptionRouter.post(
  '/',
  authorize,
  createSubscription
)

// Get subscription details
subscriptionRouter.get('/:id', (req, res) => {
  res.send('get subscriptions details')
})

// Update subscription
subscriptionRouter.put('/:id', (req, res) => {
  res.send('update subscription')
})

// Delete subscription
subscriptionRouter.delete('/:id', (req, res) => {
  res.send('delete subscriptions')
})

// Cancel subscription
subscriptionRouter.put('/:id/cancel', (req, res) => {
  res.send('cancel user subscriptions')
})

export default subscriptionRouter