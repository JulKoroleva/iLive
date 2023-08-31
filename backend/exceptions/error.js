module.exports = class ServerError extends Error {
    status;
    errors;
    constructor( status, message, errors = []){
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnathorizedError () {
        return new ServerError(401, 'User not authorized')
    }

    static BadRequest (message, errors = []) {
        return new ServerError(401, message, errors)
    }

}
