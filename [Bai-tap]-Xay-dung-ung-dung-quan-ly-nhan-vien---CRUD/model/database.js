const mysql = require('mysql');

class database {
    static connect(){
        return mysql.createConnection({
            user: 'root',
            password: 'password',
            host: 'localhost',
            port: '3305',
            charset: 'utf8_general_ci',
            database: 'company'
        })
    }
}
module.exports = database