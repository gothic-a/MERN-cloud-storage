import { Schema, Model } from 'mongoose'

const userSchema = new Schema(
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
            type: Schema.Types.ObjectID,
            ref: 'Session',
            default: [],
        }],
        cloud: {
            type: Schema.Types.ObjectID,
            ref: 'Cloud',
            default: null
        },
        subscription: {
            type: Schema.Types.ObjectID,
            ref: 'Subscription',
            default: null,
        },
        payments: [{
            type: Schema.Types.ObjectID,
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

export default Model('User', userSchema)