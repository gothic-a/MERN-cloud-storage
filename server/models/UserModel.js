import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        isActivated: {
            type: Boolean,
            default: false,
        },
        activationCode: {
            type: String,
            default: null,
        },
        sessions: [{
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Session',
            default: [],
        }],
        cloud: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Cloud',
            default: null
        },
        subscription: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Subscription',
            default: null,
        },
        payments: [{
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Payment',
            default: []
        }]
    },
    {
        timestamp: true
    }
)

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) next()

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

export default mongoose.model('User', userSchema)