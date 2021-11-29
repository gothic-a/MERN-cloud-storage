import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        plan: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        expiredAt: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Subscription', subscriptionSchema)