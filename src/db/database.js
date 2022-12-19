const mysql = require('mysql')
const mysql2 = require('mysql2/promise')
module.exports = {
    init: function (configs) {
        return mysql.createPool({
            host: process.env.MYSQL_HOST || configs.host,
            user: process.env.MYSQL_USER || configs.user,
            password: process.env.MYSQL_PASSWORD || configs.password,
            connectionLimit: process.env.MYSQL_CONNECTION_LIMIT || configs.connectionLimit,
            database: configs.database,
            debug: configs.debug,
            charset: configs.charset,
            multipleStatements: configs.multipleStatements
        })
    },
    init2: function (configs) {
        return mysql2.createPool({
            host: process.env.MYSQL_HOST || configs.host,
            user: process.env.MYSQL_USER || configs.user,
            password: process.env.MYSQL_PASSWORD || configs.password,
            connectionLimit: process.env.MYSQL_CONNECTION_LIMIT || configs.connectionLimit,
            database: configs.database,
            debug: configs.debug,
            charset: configs.charset,
            multipleStatements: configs.multipleStatements
        })
    },
}
