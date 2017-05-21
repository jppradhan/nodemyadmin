const Error = require('./error')
const dbModel = require('../models/database')

class Database {

    static getAllDatabases (req, res, next) {
        return dbModel.getAllDatabases()
            .then(data => {
                return res.status(200).send(data)
            })
    }

    static getAllTables (req, res, next) {
        const table = req.params['dbname']
        console.log(req.params)
        return dbModel.getAllTables(table)
            .then(data => {
                return res.status(200).send(data)
            })
    }
}

module.exports = Database