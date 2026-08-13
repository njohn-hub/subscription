import { Router } from 'express'

import {
  getUsers,
  getUser
} from '../controllers/user.controller.js'

import { authorize } from '../middlewares/auth.middleware.js'

const userRouter = Router()

// Get all users
userRouter.get('/', getUsers)

// Get single user
userRouter.get('/:id', authorize, getUser)



export default userRouter