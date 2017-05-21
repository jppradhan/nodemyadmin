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
        const dbname = req.params['dbname']
        if(!dbname) {
            return res.status(404).send(new Error().MissingParams())
        }
        return dbModel.getAllTables(dbname)
            .then(data => {
                return res.status(200).send(data)
            })
    }

    static getTable (req, res, next) {
        const table = req.params['table']
        if(!table) {
            return res.status(404).send(new Error().MissingParams())
        }
        return dbModel.getTable(table)
            .then(data => {
                return res.status(200).send(data)
            })
    }
}

module.exports = Database