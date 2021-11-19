import { Schema, Model } from 'mongoose'

const cloudSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        awsBucket: {
            type: String,
            required: true
        },
        usedCloudSpace: {
            type: Number,
            default: 0
        },
        files: [{
            type: Schema.Types.ObjectId,
            ref: 'File'
        }],
        sharedFiles: [{
            type: Schema.types.ObjectId,
            ref: 'SharedFile',
            default: []
        }],
        receivedFiles: [{
            type: Schema.types.ObjectId,
            ref: 'SharedFile',
            default: []
        }]
    },
    {
        timestamps: true
    }
)

export default Model('Cloud', cloudSchema)