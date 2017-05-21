/**
 * Created by jyotiprakash on 21/05/17.
 */
class Error {
    Unauthorized () {
        return { message : 'Unauthorized User' , status : 403 }
    }

    InvalidToken () {
        return { message : 'Invalid Token' , status : 403 }
    }
}

module.exports = Error;