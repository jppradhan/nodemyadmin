/**
 * Created by jyotiprakash on 20/05/17.
 */
const mysql = require('promise-mysql')
const jwt = require('jsonwebtoken')
const Error = require('./error')
const connectModel = require('../models/connection')


class Login {
    constructor (req, res, next) {
        this.req = req
        this.res = res
        this.next = next
    }
    validateUser () {
        const user = this.req.body

        let connection = mysql.createConnection({
            host: 'localhost',
            user: user.username,
            password: user.password,
            database: 'mysql'
        }).then((conn) => {
            connectModel.set(conn)
            return this.generateToken()
        }).catch((error) => {
            //logs out the error
            return this.res.send(403, new Error().Unauthorized())
        })

    }

    generateToken () {
        let token = jwt.sign({}, 'mydatabase', {
            expiresIn: '1h'
        });
        return this.res.send(200, {'message' : 'logged in', 'token': token})
    }

    init () {
        this.validateUser()
    }
}

const login = (req, res, next) => {
    return new Login(req, res, next).init()
}

module.exports = login;