class ApiErrors extends Error {
    constructor(status, message, error) {
        super(message)
        this.status = status
        this.error = error 
    }

    static BadRequest(message, error = []) {
        return new ApiErrors(400, message, error)
    }


}

export default ApiErrors