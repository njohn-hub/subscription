import Subscription from '../models/subscription.model.js'

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id
    })

    res.status(201).json({
      success: true,
      data: subscription
    })
  } catch (error) {
    next(error)
  }
}

export const getUserSubscription = async (req, res, next) => {
  try {
    // Make sure the authenticated user owns this account
    if (req.user._id.toString() !== req.params.id) {
      const error = new Error(
        'You are not the owner of this account'
      )

      error.statusCode = 403

      throw error
    }

    const subscriptions = await Subscription.find({
      user: req.user._id
    })

    res.status(200).json({
      success: true,
      data: subscriptions
    })
  } catch (error) {
    next(error)
  }
}