import ApiErrors from '../exceptions/apiErrors.js'

const errorMiddleware = (err, req, res) => {
    if(err instanceof ApiErrors) {
        return res.status(err.status).json({message: err.message, error: err.error})
    }

    return res.status(500).json({message: 'Server error', error: err})
}

export default errorMiddleware