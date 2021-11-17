import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })

        console.log(`DataBase connected: ${connection.connection.host}`)
    } catch(e) {
        console.error(e.message)
    }
}

export default connectDB