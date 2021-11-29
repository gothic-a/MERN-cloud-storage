import mongoose from 'mongoose'

const cloudSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        awsFolder: {
            type: String,
            required: true
        },
        usedCloudSpace: {
            type: Number,
            default: 0
        },
        files: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'File',
            default: []
        }],
        sharedFiles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SharedFile',
            default: []
        }],
        receivedFiles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SharedFile',
            default: []
        }]
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Cloud', cloudSchema)