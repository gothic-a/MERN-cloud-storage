import mongoose from 'mongoose'

const planSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        space: {
            type: Number,
            required: true 
        },
        value: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Plan', planSchema)