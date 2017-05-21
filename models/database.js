const connection = require('./connection')

class DatabaseModel {
    static getAllDatabases () {
        const connect = connection.get()
        const query = `show databases`
        return connect.query(query)
            .then((rows) => {

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

                let tables = [];
                for(let row = 0; row < rows.length; row++) {
                    tables.push(rows[row][`Tables_in_${databaseName}`])
                }
                let data = {'data' : tables}
                return data
            })
    }
}

module.exports = DatabaseModel