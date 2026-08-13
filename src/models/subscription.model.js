import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Subscription name is required'],
      trim: true,
      minlength: [2, 'Subscription name must be at least 2 characters'],
      maxlength: [100, 'Subscription name cannot exceed 100 characters']
    },

    price: {
      type: Number,
      required: [true, 'Subscription price is required'],
      min: [0.01, 'Price must be greater than 0']
    },

    currency: {
      type: String,
      enum: ['USD', 'EUR', 'GBP'],
      default: 'USD'
    },

    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly'],
      required: [true, 'Subscription frequency is required']
    },

    category: {
      type: String,
      enum: [
        'sports',
        'news',
        'entertainment',
        'lifestyle',
        'technology',
        'finance',
        'politics',
        'other'
      ],
      required: [true, 'Subscription category is required']
    },

    paymentMethod: {
      type: String,
      required: [true, 'Payment method is required'],
      trim: true
    },

    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired'],
      default: 'active'
    },

    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
      validate: {
        validator: value => value <= new Date(),
        message: 'Start date cannot be in the future'
      }
    },

    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          if (!value) return true
          return value > this.startDate
        },
        message: 'Renewal date must be after the start date'
      }
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
      index: true
    }
  },
  {
    timestamps: true
  }
)

// Automatically calculate renewal date
subscriptionSchema.pre('validate', function () {
  if (!this.renewalDate && this.startDate) {
    this.renewalDate = new Date(this.startDate)

    switch (this.frequency) {
      case 'daily':
        this.renewalDate.setDate(this.renewalDate.getDate() + 1)
        break

      case 'weekly':
        this.renewalDate.setDate(this.renewalDate.getDate() + 7)
        break

      case 'monthly':
        this.renewalDate.setMonth(this.renewalDate.getMonth() + 1)
        break

      case 'yearly':
        this.renewalDate.setFullYear(
          this.renewalDate.getFullYear() + 1
        )
        break
    }
  }

  // Mark as expired if renewal date has passed
  if (this.renewalDate && this.renewalDate <= new Date()) {
    this.status = 'expired'
  }
})

const Subscription = mongoose.model(
  'Subscription',
  subscriptionSchema
)

export default Subscription