import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js'

export const signup = async (req, res, next) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const { name, email, password } = req.body

    // Validate required fields
    if (!name || !email || !password) {
      const error = new Error('Name, email and password are required')
      error.statusCode = 400
      throw error
    }

    // Check if user already exists
    const userExists = await User.findOne({ email }).session(session)

    if (userExists) {
      const error = new Error('User already exists')
      error.statusCode = 409
      throw error
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const newUser = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword
        }
      ],
      { session }
    )

    const token = jwt.sign(
      {
        userId: newUser[0]._id
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN
      }
    )

    await session.commitTransaction()

    // Never return password
    const user = newUser[0].toObject()
    delete user.password

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        token,
        user
      }
    })
  } catch (error) {
    await session.abortTransaction()
    next(error)
  } finally {
    await session.endSession()
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Validate required fields
    if (!email || !password) {
      const error = new Error('Email and password are required')
      error.statusCode = 400
      throw error
    }

    // Find user
    const user = await User.findOne({ email })

    if (!user) {
      const error = new Error('Invalid email or password')
      error.statusCode = 401
      throw error
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    )

    if (!isPasswordValid) {
      const error = new Error('Invalid email or password')
      error.statusCode = 401
      throw error
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user._id
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN
      }
    )

    // Remove password before response
    const safeUser = user.toObject()
    delete safeUser.password

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: {
        token,
        user: safeUser
      }
    })
  } catch (error) {
    next(error)
  }
}