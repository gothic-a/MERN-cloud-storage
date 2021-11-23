class ApiErrors extends Error {
    constructor(status, message, error) {
        super(message)
        this.status = status
        this.error = error 
    }

    static Conflict(message, error = []) {
        return new ApiErrors(409, message, error)
    }

    static BadRequest(message, error = []) {
        return new ApiErrors(400, message, error)
    }


}

export default ApiErrors