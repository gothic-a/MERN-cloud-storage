import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectID,
            required: true,
        },
        refreshToken: {
            type: String,
            default: null,
        },
        ip: {
            type: String,
            default: null
        },
        device: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Session', sessionSchema)

