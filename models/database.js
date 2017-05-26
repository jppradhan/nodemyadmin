const connection = require('./connection')
const queryBuilder = require('sql-query').Query()

class DatabaseModel {
    static getAllDatabases () {
        const connect = connection.get()
        const query = `show databases`
        return connect.query(query)
            .then((rows) => {

                if(rows.length === 0) {
                    return []
                }

                let dbs = [];
                for(let row = 0; row < rows.length; row++) {
                    dbs.push(rows[row]['Database'])
                }
                let data = {'data' : dbs}
                return data
            })
    }

    static getAllTables (databaseName) {
        const connect = connection.get()
        const query = `show tables`
        return connect.changeUser({ database : databaseName})
            .then(() => {
                return connect.query(query)
            })
            .then((rows) => {

                if(rows.length === 0) {
                    return []
                }

                let tables = [];
                for(let row = 0; row < rows.length; row++) {
                    tables.push(rows[row][`Tables_in_${databaseName}`])
                }
                let data = {'data' : tables}
                return data
            })
    }

    static getTable (table) {
        const connect = connection.get()
        const query = `select * from ${table}`

        return connect.query(query)
            .then((rows) => {
                if(rows.length === 0) {
                    return []
                }
                let tableHeaders = Object.keys(rows[0])
                let data = {'data' : rows, 'table_headers' : tableHeaders }

                return data

            })
    }

    static createDatabase (name) {
        const connect = connection.get()
        const query = `CREATE DATABASE IF NOT EXISTS ${name}`

        return connect.query(query)
            .then(() => {
                return {
                    status : 200,
                    message : `Database ${name} created`,
                    code : 'databaseTable'
                }
            })
    }

    static createTable (name, fields) {
        const connect = connection.get()
        let query = queryBuilder.create()
            .table(name)
            .fields(fields)
            .build()
        query = query.replace(/'/g, '`')

        return connect.query(query)
            .then((rows) => {
                if(rows.length === 0) {
                    return []
                }

                return {
                    status : 200,
                    message : `Table ${name} created`,
                    code : 'createTable'
                }

            })
    }
}

module.exports = DatabaseModel