import mongoose from 'mongoose'
import { getNextSequenceValue } from '../utils'
const analyticSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      // default: await getNextSequenceValue('analytic')
    },
    eventType: {
      type: String,
      required: true
    },
    user: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true,
      default: new Date()
    }
  },
  {
    timestamps: false
  }
)
const Analytic = mongoose.model('Analytics', analyticSchema)

export default Analytic 