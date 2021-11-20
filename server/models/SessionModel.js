import { Schema, Model } from 'mongoose'

const sessionSchema = new Schema(
    {
        refreshToken: {
            type: String,
            required: true
        },
        ip: {
            type: String,
            required: false,
        },
        device: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

export default Model('Session', sessionSchema)

