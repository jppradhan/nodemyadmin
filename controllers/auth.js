const Error = require('./error')
const jwt = require('jsonwebtoken')

const Auth = (req, res, next) => {
    const token = req.headers['authorization']

    if(!token) {
        return res.send(403, new Error().InvalidToken())
    }

    return jwt.verify(token, 'mydatabase', function(err, decoded) {
        if (err) {
            return res.send(403, new Error().InvalidToken())
        } else {
            return next()
        }
    })
}

module.exports = Auth