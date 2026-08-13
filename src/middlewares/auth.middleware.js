import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env.js'
import User from '../models/user.model.js'

export const authorize = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    // Check Authorization header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }

    // Extract token
    const token = authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET)

    // Find user
    const user = await User.findById(decoded.userId).select('-password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }

    // Attach user to request
    req.user = user

    next()
  } catch (error) {
    console.error('Authorization error:', error.message)

    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    })
  }
}