# Subscription Tracker API

A RESTful backend API for managing users and their subscriptions.

Built with **Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, and Arcjet**.

---

## 🚀 Features

- User registration
- User login
- JWT authentication
- Password hashing with bcrypt
- Protected routes
- User management
- Subscription management
- Automatic subscription renewal dates
- Subscription status tracking
- MongoDB validation
- Centralized error handling
- Request authentication middleware
- Rate limiting and bot protection with Arcjet
- RESTful API architecture
- Environment-based configuration

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |
| dotenv | Environment variables |
| cookie-parser | Cookie handling |
| Arcjet | Security, rate limiting and bot detection |

---

# 📁 Project Structure

```text
tracker/
├── src/
│   ├── config/
│   │   ├── arcjet.js
│   │   └── env.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── subscription.controller.js
│   │   └── user.controller.js
│   │
│   ├── database/
│   │   └── mongodb.js
│   │
│   ├── middlewares/
│   │   ├── arcjet_middleware.js
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── models/
│   │   ├── subscription.model.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── subscription.routes.js
│   │   └── user.routes.js
│   │
│   └── index.js
│
├── .env.development.local
├── .gitignore
├── package.json
└── README.md
